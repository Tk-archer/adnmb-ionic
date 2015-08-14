// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in send.js
angular.module('adnmb', ['ionic', 'adnmb.controllers', 'adnmb.services','AcFilter'
])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {



        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in send.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'menuCtrl'
            })
            .state('app.text', {
                url: '/p/{name}',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/text.html',
                        controller: 'textCtrl'
                    }
                }
            })
            .state('app.thread', {
                url: '/t/{threadId}',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/thread.html',
                        controller: 'threadCtrl'
                    }
                }
            })
            .state('app.option', {
                url: '/option',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/option.html'
                    }
                }
            })
            .state('app.History', {
                url: '/History',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/History.html'
                    }
                }
            })
            .state('app.reply', {
                url: '/reply/{target}',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/reply.html',
                        controller: 'sendCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/p/综合版1');

    });
