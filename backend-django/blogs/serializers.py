from rest_framework import serializers

from .models import Blog


class BlogListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Blog
        fields = (
            'id',
            'Title',
            'Body',
            'BodyMeta',
            'DateCreated',
            'Author',
        )
        depth=2


class BlogDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Blog
        fields = (
            'id',
            'Title',
            'Body',
            'BodyMeta',
            'DateCreated',
            'Author',
        )

