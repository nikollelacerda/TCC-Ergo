from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django.http import FileResponse

from ergonomission.helpers import MENSAGEM_USUARIO_DUPLICADO, COSMETICO_PADRAO
from ergonomission.helpers import IsOwner
from core.models import *
from core.serializers import *

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
        try:
            if Personagem.objects.get(usuario__uid = request.user.uid):
                return Response(
                    {'error': MENSAGEM_USUARIO_DUPLICADO}, 
                    status=status.HTTP_403_FORBIDDEN
                )
        except Personagem.DoesNotExist:
            request.data["usuario"] = request.user.uid
            serializer = PersonagemCreateSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
            #cosmetico_default = Cosmetico.objects.get(id=COSMETICO_PADRAO)
            #serializer.validated_data['cosmeticos'] = cosmetico_default

            try:
                #Usar o **var nesse caso transforma um dicionario {"key":"value"} em key="value"
                personagem = Personagem.objects.create(**serializer.validated_data)
                return Response(
                    {
                        "status": "Sucesso ao criar personagem",
                        "data": PersonagemSerializer(personagem).data

                    },
                    status=status.HTTP_201_CREATED
                )
            except:
                return Response(
                    {"error": "Erro no banco de dados"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

    @action(
        detail=False, 
        methods=['get'], 
        name="Get Personagem By UID", 
        description="Recupera o Personagem de acordo com o UID fornecido",
        url_path="user/(?P<uid>\d+)"
    )
    def fetch_by_UID(self, request, uid):
        try:
            personagem = Personagem.objects.get(usuario__uid = uid)
            return Response({"data":PersonagemSerializer(personagem).data, "uid":uid}, status=status.HTTP_200_OK)
        except Personagem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(
        detail=True, 
        methods=['get'], 
        name="Get Imagem", 
        description="Recupera a imagem do Personagem de acordo com o UID fornecido",
        url_path="image"
    )
    def get_image(self, request, pk=None):
        try:
            personagem = Personagem.objects.get(id=pk)
        except Personagem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return FileResponse(open(personagem.cosmeticos.imagem.path, 'rb'), filename=f'ergocosmetico{personagem.cosmeticos.id}')
###