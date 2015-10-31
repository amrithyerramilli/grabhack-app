// Ionic grabhack App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'grabhack' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'grabhack.controllers' is found in controllers.js
angular.module('grabhack', ['ionic', 'grabhack.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.places', {
        url: '/places',
        views: {
            'menuContent': {
                templateUrl: 'templates/places.html',
                controller: 'PlacesCtrl'
            }
        }
    })

    .state('app.map', {
        url: '/mpa',
        views: {
            'menuContent': {
                templateUrl: 'templates/map.html',
                controller: 'MapCtrl'
            }
        }
    })

    .state('app.place', {
        url: '/places/:placeId',
        views: {
            'menuContent': {
                templateUrl: 'templates/place.html',
                controller: 'PlaceCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/places');
});
