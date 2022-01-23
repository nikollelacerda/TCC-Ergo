from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['uid', 'nome', 'sobrenome', 'pontos', 'username', 'password']

class PomodoroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pomodoro
        fields = ['id', 'titulo', 'status', 'duracao', 'usuario']

class AlongamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alongamento
        fields = ['id', 'descricao', 'imagem', 'tipo']

class PersonagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personagem
        fields = ['usuario', 'apelido', 'cosmeticos']

class PersonagemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personagem
        fields = ['usuario', 'apelido']        

class CosmeticoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cosmetico
        fields = ['id', 'nome', 'imagem', 'preco']

class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historico
        fields = ['id', 'usuario', 'descricao', 'data']
