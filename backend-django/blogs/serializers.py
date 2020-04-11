from rest_framework import serializers

from .models import Blog


class BlogListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = (
            'id',
            'Title',
            'Meta',
            'DateCreated',
        )


class BlogDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = (
            'id',
            'Title',
            'Body',
            'DateCreated',
        )
