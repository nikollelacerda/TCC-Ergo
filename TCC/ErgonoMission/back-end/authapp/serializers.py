from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from core.models import Usuario

class UsuarioCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = Usuario
        fields = ('username', 'password', 'nome', 'sobrenome')