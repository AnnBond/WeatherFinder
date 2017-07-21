var hours = new Date().getHours();
var minutes = new Date().getMinutes();
var time = hours + ':' + minutes;
$('.time').text(time);

function initMap() {
    var uluru = {lat: 49.84, lng: 24.03};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        draggable: true
    });

    createMarker(uluru);
// get json data from openweathermap.org
    function jsonData(link) {
        $.getJSON(link, function (data) {
            $('.city').text(data.name);
            $('.temp').text('Temp: ' + data.main.temp);
            $(".weatherIcon").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            $('.weather').text(data.weather[0].main);
            $('.wind').text('Wind: ' + data.wind.speed);  
        });
    }
//formating link
    $('.submit').on('click', function () {
        var cityName = $('.cityName').val();
        var weatherLink = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=fb6faa53d4a8f07a2660c4478582345c";
        jsonData(weatherLink);
        searchAddress(cityName);
    });
//create marker for address
    function searchAddress(addressInput) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: addressInput
        }, function (results, status) {
            var myResult = results[0].geometry.location;
            createMarker(myResult);
            map.setCenter(myResult);
            map.setZoom(4);
        });
    }

    function createMarker(latlng) {
        if (marker != undefined && marker != '') {
            marker.setMap(null);
            marker = '';
        }
        marker = new google.maps.Marker({
            map: map,
            position: latlng,
            draggable: true
        });
//moving marker 
        $('#map').mouseup('marker', function () {
            var lat = marker.getPosition().lat().toFixed(2);
            var lng = marker.getPosition().lng().toFixed(2);
            console.log(lat);
            console.log(lng);
            var weatherLink = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&units=metric&appid=fb6faa53d4a8f07a2660c4478582345c";
            jsonData(weatherLink);
        });
    }
};

