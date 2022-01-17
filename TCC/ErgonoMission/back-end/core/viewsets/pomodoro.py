import datetime
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from core.models import Historico, Pomodoro
from core.serializers import PomodoroSerializer
from ergonomission.helpers import MENSAGEM_POMODORO_CONCLUIDO, MENSAGEM_POMODORO_ENCERRADO, POMODORO_STATUS_CONCLUIDO, POMODORO_STATUS_ENCERRADO, POMODORO_STATUS_INATIVO, calcular_pontos, parse_mensagem




class PomodoroViewSet(viewsets.ModelViewSet):
    queryset = Pomodoro.objects.all()
    serializer_class = PomodoroSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]
        if self.action in ['destroy', 'update', 'partial_update', 'list']:
            permission_classes = [IsAdminUser]
        elif self.action in ['create', 'retrieve']:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
        
    def create(self, request):
        request.data["usuario"] = request.user.uid
        serializer = PomodoroSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            #Usar o **var nesse caso transforma um dicionario {"key":"value"} em key="value"
            pomodoro = Pomodoro.objects.create(**serializer.validated_data)
            pontos = calcular_pontos(pomodoro)
            pomodoro.usuario.pontos += pontos
            pomodoro.usuario.save()

            if not (pomodoro.status == POMODORO_STATUS_INATIVO[0]):
                if(pomodoro.status == POMODORO_STATUS_CONCLUIDO[0]):
                    descricao = MENSAGEM_POMODORO_CONCLUIDO
                if(pomodoro.status == POMODORO_STATUS_ENCERRADO[0]):
                    descricao = MENSAGEM_POMODORO_ENCERRADO
                descricao = parse_mensagem(descricao, pomodoro.titulo, int(pontos))
                    
                Historico.objects.create(
                    usuario=pomodoro.usuario,
                    descricao=descricao,
                    data=datetime.datetime.now()
                )

            return Response(
                {
                    "status": "Sucesso ao criar pomodoro",
                    "pontos": pontos,
                    "mensagem": descricao
                },
                status=status.HTTP_201_CREATED
            )
        except Exception as error:
            print(error)
            return Response(
                {"error":"Erro no banco de dados"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    #END create#
