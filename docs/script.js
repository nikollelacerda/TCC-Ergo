//Script JS - Site Ergonomission

//LOGIN
$('#login').on("click",()=>{
	let email = $("#content-1 input[name='email']").val();
	let senha = $("#content-1 input[name='senha']").val();
	let url = "http://localhost:3000/api";

	$.ajax({
		type:'POST',
		url: url,
		data:{
			"email":email,
			"senha": senha
		},
		dataType: "json",
		success: function(data){
			if(data.uid == undefined){
				$("#sucesso_login").text("Informações Incorretas!");
				return;
			}

			let textinho = "Login feito com sucesso!";
			$("#sucesso_login").append(textinho);
			

			let uid = new URLSearchParams();
			uid.append("uid",data.uid);
			window.location.href="login.html?" + uid.toString();
		}
	});

});

//CADASTRO 

$('#cadastrar').on("click", ()=>{
	let nome = $("#content-2 input[name='nome']").val();
	let email = $("#content-2 input[name='email']").val();
	let confirme_email = $("#content-2 input[name='confirme_email']").val();
	let senha = $("#content-2 input[name='senha']").val();
	let confirme_senha = $("#content-2 input[name='confirme_senha']").val();
	let url = "http://localhost:3000/api";

	if (email != confirme_email){
		alert("Email diferente!!");
		return;
	}
	if(senha != confirme_senha){
		alert("Senha diferente!!");
		return;
	}

	$.ajax({
		type:'PUT',
		url: url,
		data:{
			"nome":nome,
			"email":email,
			"confirme_email":confirme_email,
			"senha":senha,
			"confirme_senha":confirme_senha
		},
		dataType:"json",
		success: function(data){
			let textinho2 = "Cadastro feito com sucesso!";
			$("#sucesso_cadastro").append(textinho2);
			//console.log(data.data);
			$("#resposta").text(`Bem vindo ${data.data.nome}! \n seu email é: ${data.data.email}.`)
		}

	});
});

//ATUALIZAR CADASTRO
$('#atualizar').on("click", ()=>{
	let email = $("#content-3 input[name='email']").val();
	let novo_email = $("#content-3 input[name='novo_email']").val();
	let senha = $("#content-3 input[name='senha']").val();
	let nova_senha = $("#content-3 input[name='nova_senha']").val();
	let confirme_nova_senha = $("#content-3 input[name='confirme_nova_senha']").val();
	let url = "http://localhost:3000/api";

	let uid = new URLSearchParams(window.location.search).get("uid");

	if(nova_senha != confirme_nova_senha){
		console.log(nova_senha, confirme_nova_senha)
		alert("Senha diferente!!");
		return;
	}
	
	$.ajax({
		type:'PATCH',
		url: url,
		data:{
			"uid": uid,
			"email":novo_email,
			"senha":nova_senha
		},
		success: function(data){
			let textinho4 = "Usuário atulizado com sucesso!";
			$('#sucesso_atualiza').append(textinho4);
			$('#resposta1').text(`Email atualizado para ${data.data.email}`);
		}
	})
});


//DELETAR USUÁRIO

$('#deletar').on("click", ()=>{
	let senha = $("#content-4 input[name='senha']").val();
	let uid = new URLSearchParams(window.location.search).get("uid");
	let url = "http://localhost:3000/api";
	console.log(uid);
	$.ajax({
		type:'DELETE',
		url: url,
		data:{
			"uid":uid,
			"senha":senha
		},
		success: function(data){
			let textinho3 = "Usuário deletado com sucesso!";
			$('#sucesso_deletar').append(textinho3);

		}
	});
});

//PEDIR ALONGAMENTO
$(document).ready(function(){
	$('#alongamento').on("click", ()=>{
		let des_alonga = $('#content-5 alongamentos').val();
		let url = "http://localhost:3000/api/alongs/";

		$.ajax({
			type:'GET',
			url:url,
			success: function(data){
				$('#alonga_aqui').text('');
				for(let al of data.data){
					$('#alonga_aqui').append(`Alongamento: ${al.des_alongamento} <br>`);
				}
			}
		});

	});
});