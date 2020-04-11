from django.shortcuts import render
from rest_framework import generics

from .models import Blog
from .serializers import *

class BlogListAPiView(generics.ListAPIView):
    serializer_class = BlogListSerializer
    queryset = Blog.objects.all()


class BlogDetailAPiView(generics.RetrieveUpdateAPIView):
    serializer_class = BlogDetailAPiView
    queryset = Blog.objects.all()
