from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Author
User = get_user_model()


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email', 
            'profile',           
            'first_name',
            'last_name',
        )



class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'email', 
            'profile',           
            'first_name',
            'last_name',
            'password',
            'tokens',
        )
        extra_kwargs = {
            'password' : {'write_only': True},
            'profile' : {'required': False},
        }

    
    def get_tokens(self, user):
        
        user_obj = User(email = user.get('id'))
        tokens = RefreshToken.for_user(user_obj)
        refresh = str(tokens)
        access = str(tokens.access_token)
        data = {
            "refresh": refresh,
            "access": access
        }
        return data

        
    def create(self, validated_data):
        print(validated_data)
        if (validated_data.get('profile')):
            profile_data = validated_data.pop('profile')
            password = validated_data.pop('password')
            user = User(**validated_data)
            user.set_password(password)
            user.save()
            Author.objects.create(user=user, **profile_data)
        else:
            user = User(**validated_data)
            password = validated_data.pop('password')
            user.set_password(password)
            user.save()
        return validated_data
    



class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = (
            'id',
            'profile_image',
            'bio',
        )



class UserDetailSerializer(serializers.ModelSerializer):

    # 'profile' is related_name in  Author
    profile = AuthorSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email', 
            'profile',           
            'first_name',
            'last_name',
        )

        extra_kwargs = {
                'email': {'required': False},
                }

    def update(self, instance, validated_data):
        # saving user data
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        instance.save()

        if(validated_data['profile']):
            profile_data = validated_data.pop('profile')
            profile = instance.profile

            # saving author data
            profile.bio = profile_data.get('bio', profile.bio)
            profile.profile_image = profile_data.get('profile_image', profile.profile_image)
            profile.save()

        return instance
