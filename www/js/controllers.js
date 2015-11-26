angular.module('grabhack.controllers', ['grabhack-ar'])
    .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', AppCtrl])
    .controller('PlacesCtrl', ['$scope', '$rootScope', '$state', '$ionicModal', '$http', PlacesCtrl])
    .controller('MapCtrl', ['$ionicPlatform', '$timeout', '$scope', '$rootScope', '$q', '$state', 'WikitudeFactory', MapCtrl])
    .controller('PlaceCtrl', ['$scope', 'WikitudeFactory', PlaceCtrl]);
