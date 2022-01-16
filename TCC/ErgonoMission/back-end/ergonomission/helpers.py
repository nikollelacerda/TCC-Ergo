from rest_framework import permissions

#----------------------------------------#
### Mensagens do Sistema
#----------------------------------------#
MENSAGEM_USUARIO_DUPLICADO = 'Usuário já possui um personagem'
MENSAGEM_POMODORO_CONCLUIDO = '<p class="status-good">Você concluiu a aventura <span class="titulo">?</span> e ganhou <span class="pontos">?</span> pontos!'
MENSAGEM_POMODORO_ENCERRADO = '<p class="status-bad">Você desistiu aventura <span class="titulo">?</span>, mas ganhou <span class="pontos">?</span> pontos!'


#----------------------------------------#
### Listas
#----------------------------------------#
POMODORO_STATUS_INATIVO = ('I', 'Inativo')
POMODORO_STATUS_CONCLUIDO = ('C', 'Concluido')
POMODORO_STATUS_ENCERRADO = ('E', 'Encerrado')
POMODORO_STATUS = (
    POMODORO_STATUS_INATIVO,
    POMODORO_STATUS_CONCLUIDO,
    POMODORO_STATUS_ENCERRADO,
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

def parse_mensagem(m, *args):
    for arg in args:
        m = m.replace("?", arg, 1)
    return m

#----------------------------------------#
### Classes
#----------------------------------------#

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user