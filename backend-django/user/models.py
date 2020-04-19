from django.db import models
from django.contrib.auth.models import User


class Author(models.Model):
    
    user =                  models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image =         models.ImageField(upload_to='user_profiles/', blank=True, null=True)
    bio =                   models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user    