from django.shortcuts import render
from rest_framework import generics

from .models import Blog
from .serializers import *

class BlogDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Blog
    queryset = Blog.objects.all()
