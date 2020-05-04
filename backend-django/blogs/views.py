from django.shortcuts import render
from rest_framework import generics

from .models import Blog
from .serializers import BlogDetailSerializer, BlogListSerializer




class BlogListApiView(generics.ListAPIView):
    serializer_class = BlogListSerializer
    queryset = Blog.objects.all()


class BlogCreateApiView(generics.CreateAPIView):
    serializer_class = BlogDetailSerializer
    queryset = Blog.objects.all()
    

class BlogDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BlogDetailSerializer
    queryset = Blog.objects.all()
