from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import FileResponse

from core.models import *
from core.serializers import *

class CosmeticoViewSet(viewsets.ModelViewSet):
    queryset = Cosmetico.objects.all()
    serializer_class = CosmeticoSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]
        if self.action in ['destroy', 'create', 'update', 'partial_update']:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
    
    @action(
        detail=True, 
        methods=['get'], 
        name="Get Image", 
        description="Recupera a Imagem do Cosmetico de acordo com o ID fornecido"
    )
    def get_image(self, request, pk=None):
        cosmetico = Cosmetico.objects.get(id=pk)
        if(not cosmetico):
            return Response(status=status.HTTP_404_NOT_FOUND)

        return FileResponse(open(cosmetico.imagem.path, 'rb'), filename=f'ergocosmetico{cosmetico.id}')
