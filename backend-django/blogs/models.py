from django.db import models

class  Blog(models.Model):
    Title                   = models.CharField(max_length=100)
    Meta                    = models.CharField(max_length=500)
    Body                    = models.TextField()
    DateCreated             = models.TimeField(auto_now=True)

    def str(self):
        return self.Title