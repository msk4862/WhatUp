from django.shortcuts import render
from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()
from .models import Author
from .serializers import AuthorSerializer, UserSerializer


class UserListAPIView(generics.ListCreateAPIView):
    
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()

class UserDetailAPIView(views.APIView):
    '''
        View to get and update user details
    '''
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def get_object(self, id):
        try:
            user = User.objects.get(id=id)
            return user
        except Exception:
            return None
    
    def get(self, request, pk):
        instance = self.get_object(pk)
        if instance is None:
            return Response({'error': 'Given user not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def put(self, request, pk):
        data = request.data
        instance = self.get_object(pk)
        
        if instance is None:
            return Response({'error': 'Given user not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(instance, data = data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
