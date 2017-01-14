$(document).ready(function(){
	var urlBase = "http://172.16.0.2:50447/restExample/webresources";
	
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
		$("#lista").empty();
		$.ajax({
			url: urlBase + "/usuario"
		}).done(function(data){
			$.each(data, function(){
				adicionarLista(this);
			});
			console.log(data);
		});
	}

	function adicionarLista(data){
		var li = "<li><a id='usuarios' data-id='"+data.id+"' href='#'>"+ data.nome +"</a> | <p>"+ data.idade +" anos</p></li>";
		$("#lista").append(li);
	}



	function pegarUsuario(usuario){
		var id = $(usuario).data("id");
		$.ajax({
			url: urlBase + "/usuario/"+id
		}).done(function(data){
			$("#id").val(data.id);
			$("#nome").val(data.nome);
			$("#idade").val(data.idade);
			$("input[value='"+data.sexo+"']").prop("checked", true);
			console.log(data);
		});

	}

	function adicionarUsuario(){
		var nome = $("#nome").val();
		var idade = $("#idade").val();
		var genero = $("input[name = genero]:checked").val();
		var usuario = jQuery.parseJSON('{"nome": "'+nome+'", "idade": "'+idade+'", "sexo": "'+genero+'"}');
		console.log(usuario);
		$.ajax({
			type: "POST",
			url: urlBase+"/usuario",
			data: usuario,
		}).done(function(data){
			console.log(data);
		});

		listarUsuarios();
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
			url: urlBase + "/usuario/"+id
		}).done(function(data){
			listarUsuarios();
			console.log(data);
		});
	}

	function alterarUsuario(){
		var id = $("#id").val();
		var nome = $("#nome").val();
		var idade = $("#idade").val();
		var genero = $("input[name = genero]:checked").val();
		var usuario = jQuery.parseJSON('{"id": '+id+', "nome": "'+nome+'", "idade": '+idade+', "sexo": "'+genero+'"}');
		console.log(usuario);
		$.ajax({
			type: "PUT",
			url: urlBase+"/usuario",
			data: usuario,
		}).done(function(data){
			console.log(data);
		});

		listarUsuarios();
	}
});