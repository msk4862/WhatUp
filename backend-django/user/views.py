from django.shortcuts import render
from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()
from .models import Author
from .serializers import AuthorSerializer, UserListSerializer, UserCreateSerializer, UserDetailSerializer


class UserListAPIView(generics.ListAPIView):
    
    permission_classes = [permissions.AllowAny]
    serializer_class = UserListSerializer
    queryset = User.objects.all()


class UserCreateAPIView(views.APIView):
    '''
        User Create API View
    '''
    permission_classes = [permissions.AllowAny]
    serializer_class = UserCreateSerializer
    
    def post(self, request):
        data = request.data
        serializer = UserCreateSerializer(data=data)
        print(serializer.is_valid())
        if not serializer.is_valid(raise_exception=True):
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)        
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
        
        

class UserDetailAPIView(views.APIView):
    '''
        View to get and update user details
    '''
    permission_classes = [permissions.AllowAny]
    serializer_class = UserDetailSerializer

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

        serializer = UserDetailSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def put(self, request, pk):
        data = request.data
        instance = self.get_object(pk)
        
        if instance is None:
            return Response({'error': 'Given user not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserDetailSerializer(instance, data = data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
