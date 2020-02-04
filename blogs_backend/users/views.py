from rest_framework import generics
from rest_framework import permissions

from django.contrib.auth import get_user_model
from .serializers import UserCreationSerializer, UserLoginSerializer

from rest_framework.response import Response
from rest_framework import status, views

User = get_user_model()

class UserCreateAPIView(generics.CreateAPIView):
    '''
        User Register API View
    '''
    permission_classes = [permissions.AllowAny]
    serializer_class = UserCreationSerializer
    queryset = User.objects.all()
    


class UserLoginAPIView(views.APIView):
    '''
        User Login API View
    '''
    permission_classes = [permissions.AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data = data)
    
        if serializer.is_valid(raise_exception = True):
            new_data = serializer.data
            return Response(new_data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    