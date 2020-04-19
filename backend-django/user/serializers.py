from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Author
User = get_user_model()



class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = (
            'id',
            'profile_image',
            'bio',
        )

class UserSerializer(serializers.ModelSerializer):

    # 'profile' is related_name in  Author
    profile = AuthorSerializer()

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


    def create(self, validated_data):
        if (validated_data.get('profile')):
            profile_data = validated_data.pop('profile')
            password = validated_data.pop('password')
            user = User(**validated_data)
            user.set_password(password)
            user.save()
            Author.objects.create(user=user, **profile_data)
            return user
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        # saving user data
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        instance.save()

        # saving author data
        profile.bio = profile_data.get('bio', profile.bio)
        profile.profile_image = profile_data.get('profile_image', profile.profile_image)
        profile.save()

        return instance


    # def update(self, instance, validated_data):
    #     instance.ProfileImage = validated_data.get('ProfileImage', instance.ProfileImage)
    #     instance.IntructionMedium = validated_data.get('IntructionMedium', instance.IntructionMedium)
    #     instance.School = validated_data.get('School', instance.School)
    #     instance.Country = validated_data.get('Country', instance.Country)
    #     instance.City = validated_data.get('City', instance.City)

    #     if (validated_data.get('StudentID') is not None):
    #         user_data = validated_data.pop('StudentID')
                
    #         user = instance.StudentID
    #         user.email = user_data.get('email', user.email)
    #         user.phone_no = user_data.get('phone_no', user.phone_no)
    #         user.firstname = user_data.get('firstname', user.firstname)
    #         user.lastname = user_data.get('lastname', user.lastname)
    #         user.initialDetailFlag = user_data.get('initialDetailFlag', user.initialDetailFlag)
    #         user.save()
        
    #     instance.save()
    #     return instance
        

        
