function PlaceCtrl($scope, WikitudeFactory) {
    console.log("yo");
    $scope.currentPlace = {};

    $scope.gotoScene = function(ind) {
        WikitudeFactory.callARView(ind);
    }
}
