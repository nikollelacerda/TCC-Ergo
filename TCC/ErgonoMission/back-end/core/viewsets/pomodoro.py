from rest_framework import viewsets, status
from rest_framework.response import Response
from core.models import Pomodoro
from core.serializers import PomodoroSerializer
from ergonomission.helpers import calcular_pontos



class PomodoroViewSet(viewsets.ModelViewSet):
    queryset = Pomodoro.objects.all()
    serializer_class = PomodoroSerializer

    def create(self, request):
        request.data["usuario_uid"] = request.user.uid
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
            pontos += pomodoro.usuario.pontos
            pomodoro.usuario.update(pontos=pontos)

            return Response(
                {
                    "status": "Sucesso ao criar pomodoro"
                },
                status=status.HTTP_201_CREATED
            )
        except:
            return Response(
                {"error":"Erro no banco de dados"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
