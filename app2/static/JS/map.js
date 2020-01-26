

mapboxgl.accessToken = 'pk.eyJ1IjoicHJhbmNlMTAxIiwiYSI6ImNrMWRiOTQxNjA1enUzYnBhYWE4Zmpxc3UifQ.G3XVF2WyR6CTHbEmst5Kxg';
	mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js');
		if (!mapboxgl.supported()) {
    	 alert('Your browser does not support Mapbox GL');
    	} else {
			var coordinates = document.getElementById('coordinat');
			var map = new mapboxgl.Map({
				container: 'map', // container id
				style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
				center:[51.400764,35.691236], // starting position [lng, lat]
				zoom: 11, pitch: 30 , bearing: 0, // starting zoom
			});
		}


	//-----------------------------------------------------------------------------------
  //Sarch bar

  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  }));

//--------------------------------------------------------------------------------
//--LanLat  Sarech

var coordinatesGeocoder = function (query) {
// match anything which looks like a decimal degrees coordinate pair
var matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
if (!matches) {
return null;
}
 
function coordinateFeature(lng, lat) {
return {
center: [lng, lat],
geometry: {
type: "Point",
coordinates: [lng, lat]
},
place_name: 'Lat: ' + lat + ', Lng: ' + lng, // eslint-disable-line camelcase
place_type: ['coordinate'], // eslint-disable-line camelcase
properties: {},
type: 'Feature'
};
}
 
var coord1 = Number(matches[1]);
var coord2 = Number(matches[2]);
var geocodes = [];
 
if (coord1 < -90 || coord1 > 90) {
// must be lng, lat
geocodes.push(coordinateFeature(coord1, coord2));
}
 
if (coord2 < -90 || coord2 > 90) {
// must be lat, lng
geocodes.push(coordinateFeature(coord2, coord1));
}
 
if (geocodes.length === 0) {
// else could be either lng, lat or lat, lng
geocodes.push(coordinateFeature(coord1, coord2));
geocodes.push(coordinateFeature(coord2, coord1));
}
 
return geocodes;
};
 
map.addControl(new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
localGeocoder: coordinatesGeocoder,
zoom: 10,
placeholder: "Try: -40.00 , 170.00"
}));

//---------------------------------------------------------------------------------
//fullscreen icon
map.addControl(new mapboxgl.FullscreenControl());

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

//---------------------------------------------------------------------------------------
//go to this coordinatess
//tehran
document.getElementById('tehMap').addEventListener('click',
  function() {
    map.fitBounds([[51.008984,35.60521] , [51.90585,35.755985]])
    });
//mashhad
document.getElementById('mashMap').addEventListener('click',
    function() {
      map.fitBounds([[59.468984,36.30521] , [59.67585,36.265985]])
    });

//esfahan
document.getElementById('esfMap').addEventListener('click',
    function() {
      map.fitBounds([[51.598984,32.60521] , [51.70585,32.755985]])
    });

  //--------------------------------------------------------------------------------------
  //go to this location
//area1
document.getElementById('area1').addEventListener('click',
  function() {
    map.fitBounds([[51.434,35.709] , [51.436,35.711]])
    });
//area2
document.getElementById('area2').addEventListener('click',
    function() {
      map.fitBounds([[51.449,35.700] , [51.450,35.701]])
    });

//area3
document.getElementById('area3').addEventListener('click',
    function() {
      map.fitBounds([[51.423,35.710] , [51.424,35.711]])
    });

  //-------------------------------------------------------------------------------------
  // marker
  var marker = new mapboxgl.Marker({
    draggable: true
  })
  .setLngLat([51.400764,35.691236])
  .addTo(map);
 
  function onDragEnd() {
    var lngLat = marker.getLngLat();
      coordinates.style.display = 'block';
      coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br>Latitude: ' + lngLat.lat;
  }
  marker.on('dragend', onDragEnd);

//================================================================================================
   //go to mark
  document.getElementById('Goonmark').addEventListener('click',
    function() {
      
      map.fitBounds([[51.39,35.685],[51.41,35.700]])
    });


//--------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------
// Draw ploygon

var draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
  polygon: true,
  trash: true
  }
});
map.addControl(draw);
 
map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);
 
function updateArea(en) {
  var data = draw.getAll();
  var answer = document.getElementById('calculated-area');
    if (data.features.length > 0) {
      var area = turf.area(data);
      // restrict to area to 2 decimal points
      var rounded_area = Math.round(area*100)/100;
        answer.innerHTML = rounded_area + '<br>square meters';
    } else {
        answer.innerHTML = '';
    if (en.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
    }
}

//-------------------------------------------------------------------
// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
},
  trackUserLocation: true
}));

//-----------------------------------------
// Navigation
document.getElementById('navi').addEventListener('click',
    function() {
      map.addControl(new MapboxDirections({
      accessToken: mapboxgl.accessToken
    }), 'top-left');
});

//-------------------------------------------------------------------------

//------------------------------------------------------

//langauge
var language = new MapboxLanguage();
map.addControl(language);
  
//--------------------------------------------  