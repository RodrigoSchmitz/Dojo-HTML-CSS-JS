var urlBase = "http://172.16.0.2:50447/restExample/webresources";

$(document).ready(function(){
	
	listarUsuarios();

	$(document).on('click', '#clean', function(){
		limparCampos();
	});

	$(document).on('click', '#add', function(){
		adicionarUsuario();
	});

	$(document).on('click', '#update', function(){
		alterarUsuario();
	});

	$(document).on('click', '#delete', function(){
		deletarUsuario($("#id").val());
	});
	
	$(document).on('click', '#usuarios', function(){
		pegarUsuario(this);
	});


	

	function listarUsuarios(){
		$("#lista li").remove();
		$.ajax({
			url: urlBase + "/usuario",
			success: function(data){
				$.each(data, function(){
					adicionarLista(this);
				});
			}
		});
	}

	function adicionarLista(data){
		var li = "<li><a id='usuarios' data-id='"+data.id+"' href='#'>"+ data.nome +"</a> | <p>"+ data.idade +" anos</p></li>";
		$("#lista").append(li);
	}



	function pegarUsuario(usuario){
		var id = $(usuario).data("id");
		$.ajax({
			url: urlBase + "/usuario/"+id,
			success: function(data){
				$("#id").val(data.id);
				$("#nome").val(data.nome);
				$("#idade").val(data.idade);
				$("input[value='"+data.sexo+"']").prop("checked", true);
			}
		});

	}

	function adicionarUsuario(){
		var nome = $("#nome").val();
		var idade = $("#idade").val();
		var genero = $("input[name = genero]:checked").val();
		var usuario = JSON.stringify({'nome': nome, 'idade': idade, 'sexo': genero});
		console.log(usuario);
		$.ajax({
			type: "POST",
			contentType: 'application/json',
			url: urlBase+"/usuario",
			data: usuario,
			dataType: 'json',
			success: function(data){
				listarUsuarios();
			}
		});

		
	}

	function limparCampos(){
		$("#id").val("");
		$("#nome").val("");
		$("#idade").val("");
		$("input[name = genero]:checked").prop("checked", false);

	}

	function deletarUsuario(id){
		$.ajax({
			type: "DELETE",
			url: urlBase + "/usuario/"+id,
			success: function(data){
				listarUsuarios();
			}
		});
	}

	function alterarUsuario(){
		var id = $("#id").val();
		var nome = $("#nome").val();
		var idade = $("#idade").val();
		var genero = $("input[name = genero]:checked").val();
		var usuario = JSON.stringify({'id': id, 'nome': nome, 'idade': idade, 'sexo': genero});
		$.ajax({
			type: "PUT",
			contentType: 'application/json',
			url: urlBase+"/usuario",
			data: usuario,
			dataType: 'json',
			success: function(data){
				listarUsuarios();
			}
		});	
	}
});

