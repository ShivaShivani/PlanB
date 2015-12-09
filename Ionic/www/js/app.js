// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myapp = angular.module('PlanB', ['ionic', 'PlanB.factory', 'services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
            })
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'views/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'views/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'views/profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })
            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'views/settings.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })
            .state('app.friends', {
                url: '/friends',
                views: {
                    'menuContent': {
                        templateUrl: 'views/friends.html',
                        controller: 'FriendsCtrl'
                    }
                }
            })
            .state('details', {
                url: '/details/:eventId',
                templateUrl: 'views/details.html',
                controller: 'DetailCtrl'
            })
            .state('yelp', {
                url: '/yelp',
                templateUrl: 'views/yelp.html',
                //controller: 'DetailCtrl'
            });
        $urlRouterProvider.otherwise('/login');

    });
