from django.db import models
from tinymce.models import HTMLField

# Create your models here.

# om man gör ändringar i models --> måste ändra i databasen -->make migrations -- migrate

class Project(models.Model):
	project_title = models.CharField(max_length = 100, default = None)
	project_text = HTMLField()
	project_image = models.ImageField(blank = True) # en bild som är kopplad till varje project så så måste man definera det i modellen


	def __str__(self):
		return self.project_title


class Image(models.Model):
	image = models.ImageField(blank = True)

	def __str__(self):
		return self.image.name
