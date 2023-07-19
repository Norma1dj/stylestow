from django.db import models

# Create your models here.
class Hat(models.Model):
    name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    fabric = models.CharField(max_length=200, null=True)
