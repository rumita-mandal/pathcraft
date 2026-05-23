from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.db.models import Count
from .models import Career, RoadmapNode, Resource, UserProgress
from .serializers import (
    CareerSerializer, CareerDetailSerializer, 
    RoadmapNodeSerializer, ResourceSerializer, UserSerializer
)

class CareerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Career.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CareerDetailSerializer
        return CareerSerializer

    def retrieve(self, request, *args, **kwargs):
        lookup_value = kwargs.get('pk')
        try:
            if lookup_value.isdigit():
                instance = Career.objects.get(pk=lookup_value)
            else:
                instance = Career.objects.get(slug=lookup_value)
        except (Career.DoesNotExist, ValueError):
            return Response({'detail': 'Career path not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class RoadmapNodeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RoadmapNode.objects.all()
    serializer_class = RoadmapNodeSerializer
    filterset_fields = ['career']

class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    filterset_fields = ['node']

# --- NEW: AUTHENTICATION ENDPOINTS ---

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not email or not password:
            return Response(
                {'error': 'Please provide username, email, and password.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'Username already exists.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {'error': 'An account with this email already exists.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create user
        user = User.objects.create_user(username=username, email=email, password=password)
        token, created = Token.objects.get_or_create(user=user)

        user_serializer = UserSerializer(user)
        return Response({
            'token': token.key,
            'user': user_serializer.data
        }, status=status.HTTP_201_CREATED)

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({
            'token': token.key,
            'user': user_serializer.data
        })

# --- NEW: DB PROGRESS CHECKLIST TRACKER ---

class UserProgressViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    # GET /api/progress/ -> Returns list of completed node IDs
    def list(self, request):
        progress_records = UserProgress.objects.filter(user=request.user)
        completed_ids = list(progress_records.values_list('node_id', flat=True))
        return Response(completed_ids)

    # POST /api/progress/toggle/ -> Toggles milestone completion (creates or deletes)
    def create(self, request):
        node_id = request.data.get('node_id')
        if not node_id:
            return Response({'error': 'node_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            node = RoadmapNode.objects.get(pk=node_id)
        except RoadmapNode.DoesNotExist:
            return Response({'error': 'Roadmap node not found.'}, status=status.HTTP_404_NOT_FOUND)

        progress_record, created = UserProgress.objects.get_or_create(user=request.user, node=node)
        
        if not created:
            # If it already exists, delete it (uncheck milestone)
            progress_record.delete()
            return Response({'status': 'uncompleted', 'node_id': node_id})
        
        return Response({'status': 'completed', 'node_id': node_id}, status=status.HTTP_201_CREATED)

# --- NEW: STAFF-ONLY ADMINISTRATIVE METRICS DASHBOARD ---

class AdminStatsAPIView(APIView):
    permission_classes = [IsAdminUser] # Restricts strictly to Django staff users

    def get(self, request, *args, **kwargs):
        # 1. Total Registered Students Roster
        # Exclude superusers to focus on real student profiles, but list everything nicely
        users = User.objects.all().order_by('-date_joined')
        students_data = []
        for u in users:
            # Calculate total milestones this user completed
            completed_count = UserProgress.objects.filter(user=u).count()
            students_data.append({
                'id': u.id,
                'username': u.username,
                'email': u.email,
                'date_joined': u.date_joined.strftime('%Y-%m-%d %H:%M:%S'),
                'completed_count': completed_count,
                'is_staff': u.is_staff
            })

        # 2. Course/Career Enrollment metrics
        # Track which careers have active students (unique users completing at least one node in that career)
        careers = Career.objects.all()
        careers_data = []
        for c in careers:
            career_nodes = c.nodes.all()
            # Unique users who completed at least one node in this career
            enrolled_students = UserProgress.objects.filter(
                node__in=career_nodes
            ).values('user').distinct().count()

            # Average progress percentage of students on this track
            # Calculate: (completed nodes in this career) / (total career nodes * enrolled users)
            careers_data.append({
                'id': c.id,
                'title': c.title,
                'slug': c.slug,
                'icon': c.icon,
                'theme_color': c.theme_color,
                'node_count': career_nodes.count(),
                'enrolled_students': enrolled_students
            })

        # 3. Overall Dashboard Totals
        total_users = User.objects.count()
        total_progress_clicks = UserProgress.objects.count()
        active_enrolled_users = UserProgress.objects.values('user').distinct().count()

        return Response({
            'total_students': total_users,
            'active_students': active_enrolled_users,
            'total_milestones_completed': total_progress_clicks,
            'students': students_data,
            'careers': careers_data
        })
