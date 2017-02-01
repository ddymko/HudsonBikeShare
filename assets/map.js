function initMap() {


    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {
            lat: 40.7831,
            lng: -73.9712
        }
    });

    var request = new XMLHttpRequest();
    request.open('GET', 'https://nextbike.net/maps/nextbike-official.json', false);
    request.send();
    var json = JSON.parse(request.responseText);
    var country = json.countries;
    var data;

    $(country).each(function(i, el) {
        $(el.cities).each(function(e, le) {
            $(city_select).append('<option value=' + le.lat + ',' + le.lng + '>' + le.name + '</option>');
        });
    });

    $(function() {
        $('#city_select').on('change', function() {
            var value = this.value.split(',');
            $(country).each(function(i, el) {
                $(el.cities).each(function(e, le) {
                    if (le.name === $('#city_select option:selected').text()) {
                        data = le.places;
                    }
                });
            });
            map.setCenter({lat: Number(value[0]), lng: Number(value[1])});

            infowindow = new google.maps.InfoWindow();
            var marker;
            for (i in data) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].lat, data[i].lng),
                    map: map,
                });
                content = data[i].name + ' - Bikes available: ' + data[i].bikes;

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
