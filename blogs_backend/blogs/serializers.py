from rest_framework import serializers

from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'content',
            'date_posted',
            'author'
        )

        model = Post
