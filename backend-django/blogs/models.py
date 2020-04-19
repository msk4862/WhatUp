from django.db import models

from django.contrib.auth import get_user_model

User = get_user_model()

class Blog(models.Model):
    Title                   = models.CharField(max_length=100)
    BodyMeta                = models.CharField(max_length=500, blank=True, null=True)
    Body                    = models.TextField()
    DateCreated             = models.DateField(auto_now=True)
    Author                  = models.OneToOneField('user.Author', on_delete=models.CASCADE)

    def __str__(self):
        return self.Title