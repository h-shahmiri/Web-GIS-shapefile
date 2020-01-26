 document.getElementById('creatpoint').addEventListener('click',
    function() {
      fence = ['http://localhost:8000/admin/app1/fence/add/']
      window.open(fence , "_self");
    })
  // -------------- -------------------- ADMIN -----------------------------------
  document.getElementById('admin').addEventListener('click',
    function() {
      window.open('http://localhost:8000/admin' , "_self");
    })

  //------------------------------tools ---------------------------------

  function out_layer(map , options){

    var osm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {})

    var hotosm = L.tileLayer(
      'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {})

    var osm2 = L.tileLayer(
      'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {})

    var cycle = L.tileLayer(
      'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {})

    var osmfr = L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png')
    var osmintl = L.tileLayer('https://a.tile.openstreetmap.de/${z}/${x}/${y}.png ')

  //================================ layers ============================================

    var allOptions = {
      "Open streetmap": osm,
      "Open streetmap: Hot"   : hotosm,
      "Open streetmap: Osm"   : osm2,
      "Open streetmap: Cycle" : cycle,
      "Open streetmap: Osmfr" : osmfr,
      "Open streetmap: Osmintl" : osmintl,
    }

    // Initialize with openstreetmap
    osm.addTo(map);

    // Add baseLayers to map as control layers
    L.control.layers(allOptions).addTo(map);


// ========================================== Routing ==========================================
  $(document).ready(function(){
    $("#route").one("click",function() {
      L.Routing.control({
        waypoints: [
          L.latLng(35.71, 51.44),
          L.latLng(35.6992, 51.449)
          ],
        routeWhileDragging: true,
       
      }).addTo(map);
    });
  });
//============================= Cities ===================================================
  document.getElementById('tehran').addEventListener('click',
  function() {
    map.panTo(new L.LatLng(35.70, 51.40));
  });

  document.getElementById('mashhad').addEventListener('click',
  function() {
    map.panTo(new L.LatLng(36.32, 59.56));
  });

  document.getElementById('sanandaj').addEventListener('click',
  function() {
    map.panTo(new L.LatLng(35.30, 47.00));
  });

//-----------------------------------------------------------------------------
  document.getElementById('createfence').addEventListener('click',
    function() {
      var lat   = document.getElementById("lan").value
      var long  = document.getElementById("long").value
      var range = document.getElementById("range").value
      var warn  = document.getElementById("warn").value

      var cfeance = L.circle([lat, long], {
        color: 'blue' , fillColor: '#f05', fillOpacity: 0.5 , radius: range
      }).addTo(map); cfence.bindPopup(warn).openPopup();
    });
//----------------- coordinate ----------------------------------
  
  document.getElementById('coord').addEventListener('click',
    function() {
      var popup = L.popup();
      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
    }
    map.on('click', onMapClick);
  });

//--------------------------------- Hospital ------------------------------------
  
document.getElementById('hostlayer').addEventListener('click',
  function() {
    map.panTo(new L.LatLng(35.70, 51.40));
    var medical_data = "{% url 'hospital' %}"  ;

    function Medicalfeature(feature , layer){
      layer.on('click' , function(e){
        var ourPopup = 'name:' + e.target.feature.properties.name;
        layer.bindPopup(ourPopup).openPopup(e.lating);
      });
    }

    var medica_Layer = L.geoJson(null,{
      onEachFeature : Medicalfeature
    });

    $.getJSON(medical_data , function(data1){
      L.geoJSON(data1).addTo(map);
      medica_Layer.addData(data1); 
      medica_Layer.addTo(map);
    });
  });
//---------------------------------- Show fence layer-------------------------------------------------------
document.getElementById('fence').addEventListener('click',
  function() {
    var fencedata = "{% url 'fence' %}";

    function Fencefeature(feature , layer){
      layer.on('click' , function(e){
        var ourPopup = 'Warnning : ( ' + e.target.feature.properties.warnning +' )';
        var fence_range = e.target.feature.properties.fencerange ;
        layer.bindPopup(ourPopup).openPopup(e.lating);
      });
    }
  
  if (fence_range > 200){
    var ourLayer = L.geoJson(null,{
      onEachFeature : Fencefeature
    });
  }

  $.getJSON(fencedata , function(data){
    L.geoJSON(data).addTo(map);
    ourLayer.addData(data); 
    ourLayer.addTo(map);
  })
});

//----------------------------------MINE--------------------------------------

  document.getElementById('gomine').addEventListener('click',
    function() {
      map.panTo(new L.LatLng(35.15, 47.64));
    });

  document.getElementById('minelayer').addEventListener('click',
    function() {
      var datasets = "{% url 'mine' %}"  ;

      function Minefeature(feature , layer){
          layer.on('click' , function(e){
            var ourPopup = 'Name:' + e.target.feature.properties.name_en + "( " + e.target.feature.properties.mineral_1 +' )';
            layer.bindPopup(ourPopup).openPopup(e.lating);
          });
        }

      var ourLayer = L.geoJson(null,{
        onEachFeature : Minefeature
      });

      $.getJSON(datasets , function(data){
        L.geoJSON(data).addTo(map);
        ourLayer.addData(data); 
        ourLayer.addTo(map);
      })
    //-----------------------------------hide layer---------------------------------------
      map.on('click', function(e){
        datasets.eachLayer(function (layer) {
          datasets.resetStyle(layer);
        });
        ourLayer.eachLayer(function (layer) {
          layer._icon.style.display = 'block';
          layer._shadow.style.display = 'block';
        });
      });
    });
  
  //---------------------------------------------------------------------
    document.getElementById('minefence').addEventListener('click',
      function() {

        var circle1 = L.circle([35.178, 47.715672], {
          color: 'red' , fillColor: '#f03' , fillOpacity: 0.5 , radius: 5000
        }).addTo(map); circle1.bindPopup("Warning. Get close to the industrial environment.").openPopup();

        var circle2 = L.circle([35.134265, 47.73139], {
          color: 'blue' , fillColor: '#f03' , fillOpacity: 0.5 , radius: 5000
        }).addTo(map); circle2.bindPopup("Warning. Get close to the industrial environment.")

        var circle2 = L.circle([35.140555, 47.543611], {
          color: 'yellow' , fillColor: '#f03' , fillOpacity: 0.5 , radius: 5000
        }).addTo(map); circle2.bindPopup("Warning. Yoy Have Close To Industrial Area.")
      //var polygon = L.polygon([
        //[35.61, 51.08] , [35.62, 51.06] , [35.63, 51.147]
      //]).addTo(map); polygon.bindPopup("I am a polygon.");

      //L.marker([35.7 , 51.35]).addTo(map).bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    })
  };