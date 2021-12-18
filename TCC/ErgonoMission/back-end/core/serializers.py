from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['uid', 'nome', 'pontos', 'login', 'senha']

class PomodoroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pomodoro
        fields = ['id', 'titulo', 'status', 'duracao']

class AlongamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alongamento
        fields = ['id', 'descricao', 'imagem']

class PersonagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personagem
        fields = ['id', 'usuario_uid', 'cor_olhos', 'cor_pele']

class CosmeticoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cosmetico
        fields = ['id', 'nome', 'tipo', 'imagem']