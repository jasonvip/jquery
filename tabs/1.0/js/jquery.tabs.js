(function($){

	var methods = {
		init : function(args){
			
			var id = '#' + this.attr('id');
			
			$(id + ' .content').hide();
			
			$(id + ' ul.tabs li:first').addClass('active').show();
			
			$(id + ' .content:first').show();
			
			$(id + ' ul.tabs li').click(function() {
								
				$(id + ' ul.tabs li').removeClass('active');
				
				$(this).addClass('active');
				
				$(id + ' .content').hide();
				
				var active = $(this).find('a').attr('href');
				
				$(active).fadeIn();
				
				return false;
				
			});
		}	
	}

	$.fn.tabs = function(method) {
		if (methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
		}else if (typeof method === 'object' || ! method){
			return methods.init.apply(this,arguments)
		}else{
			$.error('Method ' + method + ' does not exist on jQuery.tabs');
		}
	};

})( jQuery );