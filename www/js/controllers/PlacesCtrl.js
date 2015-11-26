function PlacesCtrl($scope, $rootScope, $state, $ionicModal, $http) {
    $scope.currency = "INR";
    $scope.bhks = [{
        id: 1,
        name: "1 RK"
    }, {
        id: 2,
        name: "1 BHK"
    }, {
        id: 3,
        name: "2 BHK"
    }, {
        id: 4,
        name: "3 BHK"
    }, {
        id: 5,
        name: "4 BHK"
    }, {
        id: 6,
        name: "4+ BHK"
    }];
    $scope.places = [{
        id: 1,
        availability: ["Individual"],
        address: "Koramangala, Sarjapur Main Rd, Koramangala 2B Block, Bengaluru, Karnataka 560034, India",
        rent: 8500,
        rentPeriod: "per month",
        securityDeposit: 85000,
        availableFrom: moment(""),
        furnishingStatus: "Semi Furnished",
        createdAt: moment(""),
        type: $scope.bhks[0],
        images: ["https://res.cloudinary.com/grabhouse/image/private/t_fit_640_480/v1445493398/web/listing/6CrdhcQHK/8edaf42f7244b277.jpg", "https://res.cloudinary.com/grabhouse/image/private/t_fit_640_480/v1445493393/web/listing/6CrdhcQHK/03bdf9664f249bc7.jpg"],
        geolocation: {
            latitude: 12.920686,
            longitude: 77.649979
        }
    }, {
        id: 2,
        availability: ["Individual"],
        address: "Uthrali Prasadam, Koramangala, Bengaluru, Karnataka, India",
        rent: 12000,
        rentPeriod: "per month",
        securityDeposit: 45000,
        availableFrom: moment(""),
        furnishingStatus: "Semi Furnished",
        createdAt: moment(""),
        type: $scope.bhks[0],
        images: ["https://res.cloudinary.com/grabhouse/image/private/t_fill_200_150/v1446291263/web/listing/6CGLi65JD/56be98fd756f82fd.jpg", "https://res.cloudinary.com/grabhouse/image/private/t_fill_200_150/v1446291254/web/listing/6CGLi65JD/c1168f2632cff82d.jpg", "https://res.cloudinary.com/grabhouse/image/private/t_fill_200_150/v1446291246/web/listing/6CGLi65JD/699b92807b277b58.jpg"],
        geolocation: {
            latitude: 12.907495,
            longitude: 77.635073
        }
    }, {
        id: 2,
        availability: ["Family"],
        address: "Sector 1, 103, 13th Main Rd, Jakkasandra, Bengaluru, Karnataka, India",
        rent: 21000,
        rentPeriod: "per month",
        securityDeposit: 170000,
        availableFrom: moment(""),
        furnishingStatus: "Semi Furnished",
        createdAt: moment(""),
        type: $scope.bhks[2],
        images: ["https://res.cloudinary.com/grabhouse/image/private/t_fill_200_150/v1445493398/web/listing/6CrdhcQHK/8edaf42f7244b277.jpg", "https://res.cloudinary.com/grabhouse/image/private/t_fill_200_150/v1445493393/web/listing/6CrdhcQHK/03bdf9664f249bc7.jpg", "https://res.cloudinary.com/grabhouse/image/private/t_fill_200_150/v1445493403/web/listing/6CrdhcQHK/1972e3f435e4c8a7.jpg", "https://res.cloudinary.com/grabhouse/image/private/t_fill_200_150/v1445493409/web/listing/6CrdhcQHK/3d68268e244234da.jpg", "https://res.cloudinary.com/grabhouse/image/private/t_fill_200_150/v1445493388/web/listing/6CrdhcQHK/61cf73dfad7a2683.jpg"],
        geolocation: {
            latitude: 12.915063,
            longitude: 77.634858
        }
    }];

    $ionicModal.fromTemplateUrl('templates/cabs.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    $scope.go = function() {
        $scope.closeLogin();
        $state.go('app.map');
    }

    $scope.letsGo = function() {
        var getUrl = "https://grabhack-logistics.eu-gb.mybluemix.net/products";
        var selectedPlaces = [];
        for (var i = 0; i < $scope.places.length; i++) {
            var place = $scope.places[i];
            if (place.selected)
                selectedPlaces.push(place);
        };
        $rootScope.selectedPlaces = selectedPlaces;

        // book cab to first selected place
        var params = {
            latitude: selectedPlaces[0].geolocation.latitude,
            longitude: selectedPlaces[0].geolocation.longitude
        };
        $http.get(getUrl, {
            params: params
        }).then(function(response) {
            $scope.bookedCab = response.data.products[0];
            console.log($scope.bookedCab);
            $scope.modal.show();
        }, function(error) {
            alert(error);
        });
    }
}
