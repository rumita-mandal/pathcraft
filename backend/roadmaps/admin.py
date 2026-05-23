from django.contrib import admin
from .models import Career, RoadmapNode, Resource

class RoadmapNodeInline(admin.TabularInline):
    model = RoadmapNode
    extra = 1

class ResourceInline(admin.TabularInline):
    model = Resource
    extra = 1

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [RoadmapNodeInline]

@admin.register(RoadmapNode)
class RoadmapNodeAdmin(admin.ModelAdmin):
    list_display = ('title', 'career', 'order', 'difficulty', 'duration')
    list_filter = ('career', 'difficulty')
    search_fields = ('title', 'description')
    inlines = [ResourceInline]

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'node', 'resource_type', 'duration')
    list_filter = ('resource_type',)
    search_fields = ('title', 'url')
