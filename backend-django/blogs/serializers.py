from rest_framework import serializers

from .models import Blog


# class BlogListSerializer(serializers.ModelSerializer):
#     firstname = serializers.CharField(source='Author.user.first_name')
#     lastname = serializers.CharField(source='Author.user.last_name')
#     # email = serializers.CharField(source='Author.user.email_name')

#     class Meta:
#         model = Blog
#         fields = (
#             'id',
#             'Title',
#             'Body',
#             'BodyMeta',
#             'DateCreated',
#             'firstname',
#             'lastname',
#         )


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

