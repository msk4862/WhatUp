from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.conf import settings


class User(AbstractUser):
    username = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return "{}".format(self.email)


class Author(models.Model):
    user                    = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE, unique=True)
    profile_image           = models.ImageField(upload_to='user_profiles/', blank=True, null=True)
    bio                     = models.TextField(blank=True, null=True)
    
    def __str__(self):  
          return "{}'s profile".format(self.user.username)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):  
    if created:  
       profile, created = Author.objects.get_or_create(user=instance)  


