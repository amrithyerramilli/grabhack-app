angular.module('grabhack.controllers', [])
    .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', AppCtrl])
    .controller('PlacesCtrl', ['$scope', '$rootScope', '$state', PlacesCtrl])
    .controller('MapCtrl', ['$ionicPlatform', '$timeout', '$scope', '$rootScope', '$q', '$state', MapCtrl])
    .controller('PlaceCtrl', ['$scope', PlaceCtrl]);
