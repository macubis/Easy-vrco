function initMap(){
	var map = new google.maps.Map(document.getElementById("map"),{
		zoom:5,
		center: {lat: -9.1191427, lgn: -77.0349046},
		mapTypeControl:false,
		zoomControl: false,
		strestViewControl: false

			
	});

	var maker = new google.maps.Marker({
		position: map.getCenter(),
		icon:{
			path:google.maps.SymbolPath.CIRCLE,
			scale:10
		},
		draggable:true,
		map:map

	});

	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}	

	document.getElementById("encuentrame").addEventListener("click",buscar);
	var latitud,longitud;
	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;
		var miUbicacion = new google.maps.Marker({  
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.Drop,
			map: map
		});
		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud});
	}

	var funcionError = function (error){
		alert("Tenemos un problema con encontrar tu ubicación");
	}


  	var inputOrigen =(document.getElementById('origin'));    
  	var autocompleteOrigen = new google.maps.places.Autocomplete(inputOrigen);
  	autocompleteOrigen.bindTo('bounds', map);

  	var inputDestino = document.getElementById("desti");
  	var autocompleteDestino = new google.maps.places.Autocomplete(inputDestino);
  	autocompleteDestino.bindTo('bounds', map);
	
	var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
      
    directionsDisplay.setMap(map);

    var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
        
    document.getElementById("origin").addEventListener('change', onChangeHandler);
    document.getElementById("desti").addEventListener('change', onChangeHandler);
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
    origin: document.getElementById("origin").value,
    destination: document.getElementById("desti").value,
    travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
    });
}

