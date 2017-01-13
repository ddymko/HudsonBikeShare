    function initMap() {

        var uluru = {
            lat: 40.7474,
            lng: -74.0279
        };
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

        for (k in country) {
            if (country[k].name === 'Hudsonbikeshare') {
                data = country[k].cities[0].places
            }
        }

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

    }
