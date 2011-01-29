(function($){

	var methods = {
	
		init : function(args){		
		
			$('.steps DIV.step').hide();
			
			$($('.progress LI.selected A').attr('href')).show();
			
			$('.steps DIV.step').each(function(){
			
				$('#' + this.id + ' .next').click(function(){
					
					var current = '#' + $(this).closest('DIV.step').attr('id');
					
					var next = '#' + $(current).next().attr('id');
										
					$('.steps DIV.step').hide();
					
					$(next).show();
					
					$('.progress li').removeAttr('class');
					
					$('.progress li A[href*='+ next +']').parent().attr('class','selected');
					
				});
				
				$('#' + this.id + ' .back').click(function(){

					var current = '#' + $(this).closest('DIV.step').attr('id');
					
					var prev = '#' + $(current).prev().attr('id');

					$('.steps DIV.step').hide();
					
					$(prev).show();
					
					$('.progress li').removeAttr('class');
					
					$('.progress li A[href*='+ prev +']').parent().attr('class','selected');

				});
				
			});
			
			$('.progress A').click(function(){
				
				$('.steps DIV.step').hide();
				
				$($(this).attr('href')).show();
				
				$('.progress li').removeAttr('class');
				
				$(this).parent().attr('class','selected');

			});		
		
			return this;	
		}
	}

	$.fn.wizard = function(method) {
		if (methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
		}else if (typeof method === 'object' || ! method){
			return methods.init.apply(this,arguments)
		}else{
			$.error('Method ' + method + ' does not exist on jQuery.wizard');
		}
	};
 
})( jQuery );