from django.db import models

class Blog(models.Model):
    Title                   = models.CharField(max_length=100)
    BodyMeta                = models.CharField(max_length=500, blank=True, null=True)
    Body                    = models.TextField()
    DateCreated             = models.DateField(auto_now=True)

    def __str__(self):
        return self.Title