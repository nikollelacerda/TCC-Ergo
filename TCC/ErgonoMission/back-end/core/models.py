from django.db import models

# Create your models here.

class Usuario(models.Model):
    uid = models.AutoField(primary_key = True)
    nome = models.CharField(max_length = 255)
    pontos = models.IntegerField()
    login = models.CharField(max_length = 255)
    senha = models.CharField(max_length = 255)

    def __str__(self):
        return f'{self.uid} - {self.nome.capitalize()}'

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
    #duracao?
    def __str__(self):
        return f'{self.id} - {self.descricao}'

class Personagem(models.Model):
    usuario_uid = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    apelido = models.CharField(max_length=255)
    cor_olhos = models.CharField(max_length=7) #EX: "#123456"
    cor_pele = models.CharField(max_length=7)

    def __str__(self):
        return f'{self.id} - {self.apelido}'

class Cosmetico(models.Model):
    TIPOS = (
        ('C', 'Cabeça'),
        ('R', 'Rosto'),
        ('P', 'Pescoço'),
    )
    nome = models.CharField(max_length=255)
    tipo = models.CharField(max_length=2, choices=TIPOS)
    imagem = models.ImageField(upload_to='imagem/cosmetico')

    def __str__(self):
        return f'{self.id} - {self.nome}'


