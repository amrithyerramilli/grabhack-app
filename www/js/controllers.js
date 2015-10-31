angular.module('grabhack.controllers', [])
    .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', AppCtrl])
    .controller('PlacesCtrl', ['$scope', '$rootScope', '$state', PlacesCtrl])
    .controller('PlaceCtrl', ['$scope', PlaceCtrl]);
