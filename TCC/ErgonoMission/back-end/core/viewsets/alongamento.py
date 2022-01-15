from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.decorators import action
from django.http import FileResponse


from core.models import Alongamento
from core.serializers import AlongamentoSerializer

class AlongamentoViewSet(viewsets.ModelViewSet):
    queryset = Alongamento.objects.all()
    serializer_class = AlongamentoSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]
        if self.action in ['destroy', 'create', 'update', 'partial_update']:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    @action(
        detail=True, 
        methods=['get'], 
        name="Get Image", 
        description="Recupera a Imagem do Alongamento de acordo com o ID fornecido"
    )
    def get_image(self, request, pk=None):
        alongamentos = Alongamento.objects.filter(id=pk)
        if(alongamentos.len() == 0):
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = AlongamentoSerializer(alongamentos)
        try:
            with open(serializer.data.imagem, 'rb') as file:
                return FileResponse(file)
        except Exception as error:
            return Response(error, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

