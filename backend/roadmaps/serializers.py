from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Career, RoadmapNode, Resource, UserProgress

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff']

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'url', 'resource_type', 'duration']

class RoadmapNodeSerializer(serializers.ModelSerializer):
    resources = ResourceSerializer(many=True, read_only=True)

    class Meta:
        model = RoadmapNode
        fields = ['id', 'title', 'description', 'order', 'difficulty', 'duration', 'resources']

class CareerSerializer(serializers.ModelSerializer):
    node_count = serializers.IntegerField(source='nodes.count', read_only=True)

    class Meta:
        model = Career
        fields = ['id', 'title', 'slug', 'description', 'icon', 'theme_color', 'node_count', 'created_at']

class CareerDetailSerializer(serializers.ModelSerializer):
    nodes = RoadmapNodeSerializer(many=True, read_only=True)

    class Meta:
        model = Career
        fields = ['id', 'title', 'slug', 'description', 'icon', 'theme_color', 'nodes', 'created_at']

class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = ['id', 'node', 'completed_at']
