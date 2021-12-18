from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['UID', 'nome', 'pontos', 'login', 'senha']