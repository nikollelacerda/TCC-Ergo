from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import *

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

class UsuarioUpdateSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Usuario
        fields = []

class PomodoroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pomodoro
        fields = ['id', 'titulo', 'status', 'duracao', 'usuario']

class AlongamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alongamento
        fields = ['id', 'descricao', 'imagem', 'tipo']

class PersonagemSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Personagem
        fields = ['usuario',]

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
