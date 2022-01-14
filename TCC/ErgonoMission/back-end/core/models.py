from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    uid = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    sobrenome = models.CharField(max_length=255)
    pontos = models.IntegerField(default=0)

    REQUIRED_FIELDS = ['uid', 'nome', 'sobrenome', 'pontos']

    def __str__(self):
        return f'{self.uid} - {self.nome.capitalize()} {self.sobrenome.capitalize()}'

class Pomodoro(models.Model):
    STATUS = (
        ('S', 'Pausado'), #S de Stop
        ('P', 'Em Progresso'),
        ('I', 'Inativo'),
        ('C', 'Concluido'),
        ('E', 'Encerrado'),
    )
    titulo = models.CharField(max_length=255)
    status = models.CharField(max_length=1, choices=STATUS, default='I')
    duracao = models.IntegerField()

    def __str__(self):
        return f'{self.id} - {self.titulo}'

class Alongamento(models.Model):
    descricao = models.TextField()
    imagem = models.ImageField(upload_to='imagem/alongamento')

    def __str__(self):
        return f'{self.id} - {self.descricao}'

class Cosmetico(models.Model):
    nome = models.CharField(max_length=255)
    imagem = models.ImageField(upload_to='imagem/cosmetico')

    def __str__(self):
        return f'{self.id} - {self.nome}'

class Personagem(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    apelido = models.CharField(max_length=255)
    cor_olhos = models.CharField(max_length=7) #EX: "#123456"
    cor_pele = models.CharField(max_length=7)
    cosmeticos = models.ManyToManyField(Cosmetico)

    def __str__(self):
        return f'{self.id} - {self.apelido}'

class Historico(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    descricao = models.TextField()
    data = models.DateTimeField()

    def __str__(self):
        return f'{self.id} - UID{self.usuario.uid}'