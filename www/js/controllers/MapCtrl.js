function MapCtrl($ionicPlatform, $timeout, $scope, $rootScope, $q, $state) {
    $scope.geolocation = {};
    $scope.$on('$ionicView.enter', function(e) {
        $scope.$broadcast('show-loader');
        var selectedPlaces = $rootScope.selectedPlaces || [];
        var positionPromise = getCurrentPosition()
            .then(function(geo) {
                $scope.geolocation = geo;
            })
            .then(function() {
                var latLng = new google.maps.LatLng($scope.geolocation.latitude, $scope.geolocation.longitude);
                var mapOptions = {
                    center: latLng,
                    zoom: 11,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                $scope.map.setCenter(latLng);
                var infowindow = new google.maps.InfoWindow();
                var currentMarker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });
                google.maps.event.addListener(currentMarker, 'click', (function(map, marker) {
                    return function() {
                        infowindow.setContent("You are here :)");
                        infowindow.open(map, marker);
                    }
                })($scope.map, currentMarker));
            })
            .then(function() {
                var infowindow = new google.maps.InfoWindow();
                google.maps.event.addListenerOnce($scope.map, 'idle', function() {
                    var infowindow = new google.maps.InfoWindow();
                    var marker, i, place;
                    for (i = 0; i < selectedPlaces.length; i++) {
                        place = selectedPlaces[i];
                        var latLng = new google.maps.LatLng(place.geolocation.latitude, place.geolocation.longitude);

                        marker = new google.maps.Marker({
                            map: $scope.map,
                            animation: google.maps.Animation.DROP,
                            position: latLng
                        });

                        google.maps.event.addListener(marker, 'click', (function(map, marker, place, state) {
                            return function() {
                                var span = "<a href='#/app/places/" + place.id + "'><span id='marker-'" + place.id + ">" + place.address + "</span></a>"
                                infowindow.setContent(span);
                                infowindow.open(map, marker);
                            }
                        })($scope.map, marker, place, $state));
                    }

                });
            })
            .finally(function() {
                $scope.$broadcast('hide-loader');
            });



    });


    function getCurrentPosition() {
        var positionDeferred = $q.defer();
        $ionicPlatform.ready(function() {
            $timeout(function() {

                navigator.geolocation.getCurrentPosition(function(position) {
                    var geo = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    // var geo = {
                    //     latitude: 12.950072,
                    //     longitude: 77.642684
                    // }
                    positionDeferred.resolve(geo);
                }, function(response) {
                    alert('geolocation error');
                    console.log(response);
                })
            }, 100);
        });

        return positionDeferred.promise;
    }
}
