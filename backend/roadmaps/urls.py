from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CareerViewSet, RoadmapNodeViewSet, ResourceViewSet,
    RegisterAPIView, CustomObtainAuthToken, UserProgressViewSet, AdminStatsAPIView
)

router = DefaultRouter()
router.register(r'careers', CareerViewSet, basename='career')
router.register(r'nodes', RoadmapNodeViewSet, basename='node')
router.register(r'resources', ResourceViewSet, basename='resource')
router.register(r'progress', UserProgressViewSet, basename='progress')

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', CustomObtainAuthToken.as_view(), name='login'),
    path('admin/stats/', AdminStatsAPIView.as_view(), name='admin-stats'),
    path('', include(router.urls)),
]
