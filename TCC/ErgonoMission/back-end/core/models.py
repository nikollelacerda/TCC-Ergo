from django.db import models

# Create your models here.

class Usuario(models.Model):
    UID = models.AutoField(primary_key = True)
    nome = models.CharField(max_length = 255)
    pontos = models.IntegerField()
    login = models.CharField(max_length = 255)
    senha = models.CharField(max_length = 255)