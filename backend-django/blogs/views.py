from django.shortcuts import render
from rest_framework import generics

from .models import Blog
from .serializers import BlogSerializer


class BlogListApiView(generics.ListCreateAPIView):
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()


class BlogDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
