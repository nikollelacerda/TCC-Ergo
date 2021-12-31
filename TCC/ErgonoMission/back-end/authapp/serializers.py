from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import *

class AuthUsuarioCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = AuthUsuario
        fields = ('id', 'username', 'password', 'tipo_usuario')