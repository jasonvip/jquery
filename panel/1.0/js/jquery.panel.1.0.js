(function($){

	var opts = {
		id:'#panel',
		opened:200,
		closed:20
	};
	
	var methods = {
		init : function(args){		

			$.extend(opts,args);

			var top = $('body').height()  - opts.closed;
			
			$(this).attr('style','position:relative;top:'+top+'px;');

			$(window).resize(function(){
			
				var top = $('body').height()  - opts.closed;
				
				var style = 'position:relative;top:'+ top +'px;height:'+ opts.closed +'px';
				
				$('#panel-tab-toggle').text('show');

				$(opts.id).attr('style',style);					
			});
			
			$('#panel-tab A').click(function(){
				
				var top = 0;
				var style = '';
				
				if ($(this).attr('class') == 'show')
				{
					top = $('body').height()  - opts.opened;
					//style = 'position:relative;top:'+ top +';height:'+ opts.opened +'px';
					
					$(opts.id).animate({
						top:top,
						height:opts.opened
					},500,function(){});
					
					$('#panel-tab-toggle').text('hide');
					$('#panel-tab-toggle').attr('class','hide');
				}
				else
				{
					top = $('body').height()  - opts.closed;
					//style = 'position:relative;top:'+ top +';height:'+ opts.closed +'px';
					
					$(opts.id).animate({
						top:top,
						height:opts.closed
					},500,function(){});
					
					$('#panel-tab-toggle').text('show');
					$('#panel-tab-toggle').attr('class','show');					
				}

				return this;
				
			});			

		}
	}

	$.fn.panel = function(method) {
		if (methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
		}else if (typeof method === 'object' || ! method){
			return methods.init.apply(this,arguments)
		}else{
			$.error('Method ' + method + ' does not exist on jQuery.panel');
		}
	};
 
})( jQuery );