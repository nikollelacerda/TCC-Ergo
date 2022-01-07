from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from ergonomission.helpers.permissions import IsOwner
from .models import *
from .serializers import *

class PomodoroViewSet(viewsets.ModelViewSet):
    queryset = Pomodoro.objects.all()
    serializer_class = PomodoroSerializer

class AlongamentoViewSet(viewsets.ModelViewSet):
    queryset = Alongamento.objects.all()
    serializer_class = AlongamentoSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]
        if self.action in ['destroy', 'create', 'update', 'partial_update']:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

class PersonagemViewSet(viewsets.ModelViewSet):
    queryset = Personagem.objects.all()
    serializer_class = PersonagemSerializer
    
    def get_permissions(self):
        permission_classes = [AllowAny]
        if self.action == 'destroy':
            permission_classes = [IsAdminUser]
        elif self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            permission_classes = [IsAuthenticated, IsOwner]

        return [permission() for permission in permission_classes]

    def create(self, request):
        if Personagem.objects.filter(usuario_uid = request.user.uid):
            return Response(
                {'error': 'Usuário já possui um personagem'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        request.data["usuario_uid"] = request.user.uid
        serializer = PersonagemSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            #Usar o **var nesse caso transforma um dicionario {"key":"value"} em key="value"
            Personagem.objects.create(**serializer.validated_data)
            return Response(
                {
                    "status": "Sucesso ao criar personagem"
                },
                status=status.HTTP_201_CREATED
            )
        except:
            return Response(
                {"error":"Erro no banco de dados"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            

        

class CosmeticoViewSet(viewsets.ModelViewSet):
    queryset = Cosmetico.objects.all()
    serializer_class = CosmeticoSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]
        if self.action in ['destroy', 'create', 'update', 'partial_update']:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

class HistoricoViewSet(viewsets.ModelViewSet):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer


