from rest_framework import permissions

#----------------------------------------#
### Mensagens do Sistema
#----------------------------------------#
MENSAGEM_USUARIO_DUPLICADO = 'Usuário já possui um personagem'

#----------------------------------------#
### Listas
#----------------------------------------#
POMODORO_STATUS = (
    ('I', 'Inativo'),
    ('C', 'Concluido'),
    ('E', 'Encerrado'),
)

#----------------------------------------#
### Funções
#----------------------------------------#

def calcular_pontos(p):
    multiplier = 0
    if(p.status == POMODORO_STATUS[1][0]):
        multiplier = 1.5
    if(p.status == POMODORO_STATUS[2][0]):
        multiplier = 1
    
    pontos = p.duracao / 60 * multiplier
    return pontos

#----------------------------------------#
### Classes
#----------------------------------------#

class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user