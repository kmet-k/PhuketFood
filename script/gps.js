var getlatres = localStorage.getItem("lat")
var getlngres = localStorage.getItem("lng")
var getresname = localStorage.getItem("name")






window.onload = function () {



        var apiGeolocationSuccess = function(position) {
            alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
            var geosetlat = position.coords.latitude
            var geosetlng = position.coords.longitude
            localStorage.setItem("setlat", geosetlat)
            localStorage.setItem("setlng", geosetlng)
        };
        
        var tryAPIGeolocation = function() {
            jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBBhWuKcXhA0rPoxgPS_2-VFCFuRuKpa2w", function(success) {
                apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
                
               
          })
          .fail(function(err) {
            alert("API Geolocation error! \n\n"+err);
          });
        };
        
        var browserGeolocationSuccess = function(position) {
            alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
         
        };
        
        var browserGeolocationFail = function(error) {
          switch (error.code) {
            case error.TIMEOUT:
              alert("Browser geolocation error !\n\nTimeout.");
              break;
            case error.PERMISSION_DENIED:
              if(error.message.indexOf("Only secure origins are allowed") == 0) {
                tryAPIGeolocation();
              }
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Browser geolocation error !\n\nPosition unavailable.");
              break;
          }
        };

        
        var tryGeolocation = function() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                browserGeolocationSuccess,
              browserGeolocationFail,
              {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true});
           
          }
        };
        tryGeolocation()
  

        // if ("geolocation" == navigator) {
        //     navigator.geolocation.getCurrentPosition(function (p) {
        //         console.log(p);
                  
                
        //         localStorage.setItem("setlat", geosetlat)
        //         localStorage.setItem("setlng", geosetlng)
        //     })
        // }
        

    

// สนามบาส**
//7.8933743000000005 
// 98.3542394


    var getgeolat = localStorage.getItem("setlat")
    var getgeolng = localStorage.getItem("setlng")
 
    console.log(getgeolat);
    console.log(getgeolng);

    var location = { lat: 7.8948671, lng: 98.3531003 };
    var mapOptions = {
        // center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
        zoom: 13,
        center: location

    };


    var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
    var infoWindow = new google.maps.InfoWindow();

    var lat_lng = new Array();
    var latlngbounds = new google.maps.LatLngBounds();

    var psulatlng = new google.maps.LatLng(getgeolat, getgeolng);
    lat_lng.push(psulatlng);
    
    var myLatlng = new google.maps.LatLng(getlatres, getlngres);
    lat_lng.push(myLatlng);
 


    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        

        // title: data.title
    });

    var marker = new google.maps.Marker({
        position: psulatlng,
        map: map,
        
        // title: data.title
    });

    latlngbounds.extend(marker.position);


    (function (marker) {
        google.maps.event.addListener(marker, "click", function (e) {
            infoWindow.setContent(getresname);
            infoWindow.open(map, marker);
        });
    })(marker);

    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);




    var path = new google.maps.MVCArray();


    var service = new google.maps.DirectionsService();


    var poly = new google.maps.Polyline({ map: map, strokeColor: '#c249e7' });


    for (var i = 0; i < lat_lng.length; i++) {
        if ((i + 1) < lat_lng.length) {
            var src = lat_lng[i];
            var des = lat_lng[i + 1];
            path.push(src);
            poly.setPath(path);
            service.route({
                origin: src,
                destination: des,
                travelMode: google.maps.DirectionsTravelMode.DRIVING

            }, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                        path.push(result.routes[0].overview_path[i]);
                    }
                }
            });
        }
    }

    var changelat = "lat:" + getlatres;
    var changelng = "lng:" + getlngres;

    var origin = src
    var destination = des
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
            unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
            avoidHighways: false,
            avoidTolls: false
        },
        callback
    );
    // get distance results
    function callback(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            $("#result").html(err);
        } else {
            var origin = response.originAddresses[0];
            var destination = response.destinationAddresses[0];
            if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                $("#result").html(
                    "Better get on a plane. There are no roads between " +
                    origin +
                    " and " +
                    destination
                );
            } else {
                var distance = response.rows[0].elements[0].distance;
                var duration = response.rows[0].elements[0].duration;

                var distance_in_kilo = distance.value / 1000; // the kilom
                var distance_in_mile = distance.value / 1609.34; // the mile
                var duration_text = duration.text;
                var duration_value = duration.value;
                $("#in_mile").text(distance_in_mile.toFixed(2));
                $("#in_kilo").text('Distance : ' + distance_in_kilo.toFixed(2) + ' Km');
                $("#duration_text").text('Time : ' + duration_text);
                $("#duration_value").text(duration_value);
                $("#from").text('Origin : ' + origin);
                $("#to").text('destination : ' + destination);
            }
        }
    }
}