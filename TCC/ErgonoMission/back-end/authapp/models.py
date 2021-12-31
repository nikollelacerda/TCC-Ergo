from django.db import models
from django.contrib.auth.models import AbstractUser


class TipoUsuario(models.Model):
    nome = models.CharField(max_length=255)
    privilegio = models.IntegerField()

class AuthUsuario(AbstractUser):
    tipo_usuario = models.ForeignKey(TipoUsuario, on_delete=models.DO_NOTHING)
    REQUIRED_FIELDS = ['tipo_usuario',]
