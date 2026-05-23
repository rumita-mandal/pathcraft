from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User

class Career(models.Model):
    title = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField()
    icon = models.CharField(max_length=50, help_text="Lucide icon name (e.g. Code, Database, Server)")
    theme_color = models.CharField(max_length=100, help_text="CSS gradient or theme class")
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class RoadmapNode(models.Model):
    DIFFICULTY_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]

    career = models.ForeignKey(Career, on_delete=models.CASCADE, related_name='nodes')
    title = models.CharField(max_length=150)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='Beginner')
    duration = models.CharField(max_length=50, help_text="Estimated time (e.g. 1-2 weeks)")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.career.title} - Step {self.order}: {self.title}"

class Resource(models.Model):
    RESOURCE_TYPES = [
        ('youtube_playlist', 'YouTube Playlist'),
        ('youtube_video', 'YouTube Video'),
        ('article', 'Article/Documentation'),
    ]

    node = models.ForeignKey(RoadmapNode, on_delete=models.CASCADE, related_name='resources')
    title = models.CharField(max_length=150)
    url = models.URLField(help_text="Link to the YouTube playlist or video")
    resource_type = models.CharField(max_length=30, choices=RESOURCE_TYPES, default='youtube_playlist')
    duration = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. 5 hours, 12 videos")

    def __str__(self):
        return f"{self.node.title} Resource: {self.title}"

class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress')
    node = models.ForeignKey(RoadmapNode, on_delete=models.CASCADE, related_name='user_progress')
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'node')
        verbose_name_plural = "User Progress"

    def __str__(self):
        return f"{self.user.username} completed {self.node.title}"
