from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from ergonomission.helpers.permissions import IsOwner
from .models import *
from .serializers import *

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetchHistorico(request, uid):
    try:
        docs = Historico.objects.filter(usuario__uid=uid)
        return Response({"data": docs}, status=status.HTTP_200_OK)
    except Exception as err:
        return Response({"error": str(err)}, status=status.HTTP_204_NO_CONTENT)


# Import dos Viewsets
from .viewsets.alongamento import AlongamentoViewSet
from .viewsets.cosmetico import CosmeticoViewSet
from .viewsets.personagem import PersonagemViewSet
from .viewsets.pomodoro import PomodoroViewSet
from .viewsets.historico import HistoricoViewSet

        




