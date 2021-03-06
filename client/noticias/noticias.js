angular.module("interCeramic")
.controller("NoticiasCtrl", NoticiasCtrl);  
 function NoticiasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('noticias');

	this.helpers({
	  noticias : () => {
		  return Noticias.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoNoticia = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.noticia = {};		
  };
  
  this.guardar = function(noticia)
	{
		this.noticia.estatus = true;
		console.log(this.noticia);
		Noticias.insert(this.noticia);
		toastr.success('noticia guardado.');
		this.noticia = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.noticias')
	};
	
	this.editar = function(id)
	{
    this.noticia = Noticias.findOne({_id:id});
    this.action = false;
    $('.collapse').coll
    this.nuevo = false;
	};
	
	this.actualizar = function(noticia)
	{
		var idTemp = noticia._id;
		delete noticia._id;		
		Noticias.update({_id:idTemp},{$set:noticia});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	

	this.cambiarEstatus = function(id)
	{
		var noticia = noticias.findOne({_id:id});
		if(noticia.estatus == true)
			noticia.estatus = false;
		else
			noticia.estatus = true;
		
		noticias.update({_id: id},{$set :  {estatus : noticia.estatus}});
    };
		
};
