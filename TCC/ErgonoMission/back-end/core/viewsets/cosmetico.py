from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
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
        if self.action == "comprar":
            permission_classes = [IsAuthenticated]
        if self.action in ['destroy', 'create', 'update', 'partial_update']:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
    
    @action(
        detail=True, 
        methods=['get'], 
        name="Get Image", 
        description="Recupera a Imagem do Cosmetico de acordo com o ID fornecido",
        url_path="image"
    )
    def get_image(self, request, pk=None):
        try:
            cosmetico = Cosmetico.objects.get(id=pk)
        except Cosmetico.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return FileResponse(open(cosmetico.imagem.path, 'rb'), filename=f'ergocosmetico{cosmetico.id}')
    
    
    @action(
        detail=True,
        methods=['get'],
        name="Comprar Cosmetico",
        description="Compra o Cosmetico de acordo com o ID do cosmetico e personagem, e se tiver pontos o suficiente.",
        url_path="comprar/(?P<uid>\d+)",
        url_name="comprar"
    )
    def comprar(self, request, pk=None, uid=None):
        try:
            cosmetico = Cosmetico.objects.get(id=pk)
        except Cosmetico.DoesNotExist:
            return Response("Cosmetico não existe", status=status.HTTP_404_NOT_FOUND)
        
        try:
            usuario = Usuario.objects.get(uid=uid)
        except Usuario.DoesNotExist:
            return Response("Usuario não existe", status=status.HTTP_404_NOT_FOUND)
        
        if (usuario.pontos < cosmetico.preco):
            return Response("Pontos insuficientes", status=status.HTTP_412_PRECONDITION_FAILED)
        
        usuario.pontos -= cosmetico.preco
        try:
            usuario.personagem.cosmeticos = cosmetico
        except:
            return Response("Usuário não possui um personagem", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            usuario.personagem.save()
            usuario.save()
            return Response(
                {
                    "status": "Compra bem sucedida!",
                    "data": {
                        "pontos": usuario.pontos,
                        "cosmetico": usuario.personagem.cosmeticos.id
                    }
                }, 
                status=status.HTTP_200_OK
            )
        except Exception as error:
            print(error)
            return Response("", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        

        

