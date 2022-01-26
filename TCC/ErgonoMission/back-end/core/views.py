from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from core.serializers import UsuarioUpdateSerializer
from ergonomission.helpers import IsOwner
from .models import Historico, Usuario

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetchHistorico(request, uid):
    try:
        historicos = Historico.objects.filter(usuario__uid=uid)
        response_data = []
        for hist in historicos:
            response_data.append({
                "id": hist.id,
                "descricao": hist.descricao,
                "data": hist.data,
                "uid": hist.usuario.uid
            })
        return Response({"data": response_data}, status=status.HTTP_200_OK)
    except Exception as err:
        print(err)
        return Response({"error": str(err)}, status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsOwner])
def updateUsuario(request, uid):
        serializer = UsuarioUpdateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            updated = Usuario.objects.filter(uid=uid).update(**request.data)
            if(updated == 0):
                return Response(status=status.HTTP_304_NOT_MODIFIED)
            return Response({"data": request.data}, status=status.HTTP_200_OK)
        except Exception as err:
            print(err)
            return Response({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Import dos Viewsets
# https://www.django-rest-framework.org/api-guide/viewsets/
from .viewsets.alongamento import AlongamentoViewSet
from .viewsets.cosmetico import CosmeticoViewSet
from .viewsets.personagem import PersonagemViewSet
from .viewsets.pomodoro import PomodoroViewSet
from .viewsets.historico import HistoricoViewSet

        




