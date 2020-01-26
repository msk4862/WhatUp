from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)    # auto_now_add=True makes date equals to
                                                                #  date of creation(fixed value)
    author = models.ForeignKey(User, on_delete=models.CASCADE)  # CASCADE: if user is deleted than all of his posts will be deletd


    def __str__(self):
        return 'Title: ' + self.title
