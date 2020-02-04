from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.models import Q


User = get_user_model()

class UserCreationSerializer(serializers.ModelSerializer):
    '''
       Serializer for User register  
    '''
    class Meta:
        model = User
        fields = (
            'email',
            'phone_no',
            'firstname',
            'lastname',
            'user_type',
            'password',
        )
        extra_kwargs = {
            'password' : {'write_only': True}
        }
        
    def validate(self, attrs):

    #   '''
    #     Validating data before saving to DB.
    #   '''
    #     email = attrs['email']
    #     user_query = User.objects.filter(email=email)

    #     if user_query.exists():
    #         raise ValidationError('Already exist!')
        return attrs

    def create(self, validated_data):
        '''
            Create user using register API
        '''
        email = validated_data['email']
        phone_no = validated_data['phone_no']
        firstname = validated_data['firstname']
        lastname = validated_data['lastname']
        password = validated_data['password']
        user_type = validated_data['user_type']

        user_obj = User(
            email = email,
            phone_no = phone_no,
            firstname = firstname,
            lastname = lastname,
            user_type = user_type,
        )

        user_obj.set_password(password)
        user_obj.save()
        
        return validated_data


class UserLoginSerializer(serializers.ModelSerializer):
    '''
       Serializer for User login  
    '''
    email = serializers.EmailField(label = 'Email Address')
    token = serializers.CharField(allow_blank=True, read_only=True)
    class Meta:
        model = User
        fields = (
            'email',
            'password',
            'token',
        )
        extra_kwargs = {
            'password' : {'write_only': True}
        }
    
    def validate(self, attrs):
        '''
            User Login validation error 
        '''
        email = attrs['email']
        password = attrs['password']

        if not email:
            raise serializers.ValidationError('Email is required!')

        # Filtering using Q
        user = User.objects.filter(
            Q(email = email)
        ).distinct()

        if user.exists():
            user_obj = user.first()
        else:
            raise serializers.ValidationError('This Email does not exist!')

        if user_obj:
            if not user_obj.check_password(password):
                raise serializers.ValidationError('Entered password is incorrect!')
        
        attrs['token'] = 'TOKEN'
        return attrs
     