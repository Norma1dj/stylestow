from django.db import models

# Create your models here.
class Shoe(models.Model):
    manufacturer = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    picture_url = models.URLField(null=True)
    bin_location = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.manufacturer} {self.model_name}"