(function($){

	var methods = {
	
		init : function(args){		
								
			$('#' + this.attr('id') + ' p').hide();
			
			$('#' + this.attr('id')).hover(
				function(){			
					$('#' + this.id + ' p').slideDown(300,function(){});
				},
				function(){
					$('#' + this.id + ' p').slideUp(300,function(){});						
				}
			);			
		
			return this;	
		}
	}

	$.fn.box = function(method) {
		if (methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
		}else if (typeof method === 'object' || ! method){
			return methods.init.apply(this,arguments)
		}else{
			$.error('Method ' + method + ' does not exist on jQuery.box');
		}
	};
 
})( jQuery );