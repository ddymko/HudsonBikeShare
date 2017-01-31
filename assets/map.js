function initMap() {

    var uluru = {
        lat: 40.7831,
        lng: -73.9712
    }
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru
    });

    var request = new XMLHttpRequest();
    request.open("GET", 'https://nextbike.net/maps/nextbike-official.json', false);
    request.send();
    var json = JSON.parse(request.responseText);
    var country = json.countries;
    var data;

    $(country).each(function(i, el) {
        $(el.cities).each(function(e, le) {
            $(city_select).append('<option>' + le.name + '</option>');
        });
    });

    $(function() {
        $(city_select).on("change", function() {

            var value = this.value;

            $(country).each(function(i, el) {
                $(el.cities).each(function(e, le) {
                    if (le.name === value) {
                        uluru = {
                            lat: le.lat,
                            lng: le.lng
                        };
                        data = le.places;
                    }
                });
            });


            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: uluru
            });

            infowindow = new google.maps.InfoWindow();
            var marker;
            for (i in data) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].lat, data[i].lng),
                    map: map,
                });
                content = data[i].name + " - Bikes available: " + data[i].bikes;

                google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
                    return function() {
                        infowindow.close();
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    };
                })(marker, content, infowindow));

            }

        });
    });

}
