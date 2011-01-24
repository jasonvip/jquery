(function($){

	var map;
	var markers = [];
	var panorama;

	function load(args,callback)
	{
		$.ajax({
			url:args.url,
			dataType:'json',
			success:callback,
			error:function(request,status,error){
				alert('An error occurred retrieving ' + args.url);
			}
		});
	}

	function addMarker(latlng,title){

		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title:title
		});		
		
		markers.push(marker);  	
	}

	// Removes the overlays from the map, but keeps them in the array
	function hideMarkers() {
  		if (markers) {
    			for (i in markers) {
      				markers[i].setMap(null);
    			}
  		}
	}

	// Shows any overlays currently in the array
	function showMarkers() {
		if (markers) {
			for (i in markers) {
			  markers[i].setMap(map);
			}
		}
	}

	// Deletes all markers in the array by removing references to them
	function deleteMarkers() {
		if (markers) {
			for (i in markers) {
			  markers[i].setMap(null);
			}
			markers.length = 0;
		}
	}
	
	var methods = {
		init : function(args){			
			var options = {
				center:new google.maps.LatLng(51.017467,-3.834335),
				zoom:8,
				disableDefaultUI: true,	
				mapTypeId:google.maps.MapTypeId.ROADMAP,
				navigationControl: true,
				mapTypeControl: true,
				scaleControl: false,
				scrollwheel: false,
				navigationControlOptions: {
					style: google.maps.NavigationControlStyle.SMALL
				},
				mapTypeControlOptions: {
					style:google.maps.MapTypeControlStyle.DROPDOWN_MENU
				}
			}
			
			$.extend(options,args);
			
			map = new google.maps.Map(document.getElementById($(this).attr("id")),options);
			
			return this;
		},
		load : function(args){

			load(args,function(data){
					
				deleteMarkers();	
										
				for (var i = 0;i<data.length;i++){
							
					var latlng = new google.maps.LatLng(data[i]["latitude"],data[i]["longitude"]);					
				
					addMarker(latlng,data[i]["title"]);

				}
				
			});
			
			return this;
		},
		position : function(args){

			var latlng = new google.maps.LatLng(args.latitude,args.longitude);
			
			addMarker(latlng,args.title);
			
			return this;
		},
		resize : function(args){
			
			var latlng = new google.maps.LatLng(args.latitude,args.longitude);
			google.maps.event.trigger(map, 'resize');
			map.setCenter(latlng);
			
			return this;
		},
		streetview : function(args){
		
			var options = {
				position:new google.maps.LatLng(51.017467,-3.834335),
				pov: {
				  heading: 270,
				  pitch:0,
				  zoom:1
				}
			}	
			
			$.extend(options,args);

			var service = new google.maps.StreetViewService();
			var el = document.getElementById($(this).attr("id"));
			
			service.getPanoramaByLocation(options.position,50,function(data,status){
				if (status == 'OK'){
					panorama = new google.maps.StreetViewPanorama(el,options)
					panorama.setVisible(true);					
				}
				else{
					$(el).text("Sorry, no street view is available within 50 meters of this location");
				}	
			});	
			 
			return this;
		}
	}

	$.fn.gmap = function(method) {
		if (methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
		}else if (typeof method === 'object' || ! method){
			return methods.init.apply(this,arguments)
		}else{
			$.error('Method ' + method + ' does not exist on jQuery.gmap');
		}
	};
 
})( jQuery );
