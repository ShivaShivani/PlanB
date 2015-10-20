/**
 * Created by akhilagaddala on 10/15/15.
 */

angular.module('PlanB.controller', ['ionic', 'ui.router'])
    .controller('LoginCtrl', function ($scope, $state, $http, $httpParamSerializerJQLike) {
        $scope.pageClass = 'login';
        //$scope.register = function () {
        //    $state.go('register')
        //}
        $scope.login = function (username, password) {
            $state.go('home')
        }

    })
    .controller('RegisterCtrl', function ($scope, $state, $http, $httpParamSerializerJQLike) {
        $scope.home = function () {
            $state.go('home')
        }
        $scope.pageClass = 'register';
        $scope.register = function (username, password, confirmpassword, email) {
            console.log("inside login function");
            if (password == confirmpassword) {
                $http({
                    method: 'POST',
                    url: 'https://api.mongolab.com/api/1/databases/asedemo/collections/users?apiKey=Xx4htLKN3YDE1zVeTjZBZJJxn4AyJZ74',
                    data: JSON.stringify({
                        name: username,
                        password: password,
                        email: email
                    }),
                    contentType: "application/json"
                }).success(function () {
                    $scope.userName = "";
                    $scope.password = "";
                    $scope.email = "";

                    //$scope.msg2 ="User created successfully";
                })
            } else {
                $scope.msg1 = "Password did not match";
            }
        }

    })
    .controller('HomeCtrl', function ($scope, $state, $ionicModal) {
        $scope.events = [];

        //open our plan modal
        $scope.plan = function () {
            $scope.eventModal.show();
        };
        //Create and load the Modal
        $ionicModal.fromTemplateUrl('views/plan.html', function (modal) {
            $scope.eventModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });
        //called when event is submitted
        $scope.create = function (event) {
            $scope.events.push({
                title: event.title,
                location: event.location,
                datetime: event.datetime
            });
            $scope.closeEvent();

            event.title = "";
            event.location = "";
            event.datetime = "";
        };
        // Close the event modal
        $scope.closeEvent = function () {
            $scope.eventModal.hide();
        }
        $scope.data = {
            showDelete: false
        };

        $scope.onItemDelete = function (item) {
            $scope.items.splice($scope.items.indexOf(item), 1);
        };


    })
;

