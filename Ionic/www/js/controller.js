/**
 * Created by akhilagaddala on 10/15/15.
 */

angular.module('PlanB.controller', ['ionic', 'ui.router'])
    .controller('LoginCtrl', function ($scope, $state, $http, $httpParamSerializerJQLike, UserService, $ionicLoading) {
        $scope.pageClass = 'login';

       //This method will be executed when user press the" Login with userId and Password"
        $scope.login = function (username, password) {
            $state.go('home')
        };

        //This method is executed when the user press the "Login with Google" button
        $scope.googleSignIn = function() {
            $ionicLoading.show({
                template: 'Logging in...'
            });

            window.plugins.googleplus.login(
                {
                },
                function (user_data) {
                    console.log(user_data);
                    alert(JSON.stringify(user_data));

                    var term=null;
                    $http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+user_data.oauthToken).
                        then(function(response) {
                            console.log(response)
                            // this callback will be called asynchronously
                            // when the response is available'
                            //alert("success");
                        }, function(response) {
                            console.log(response)
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            //alert("failed");
                        });
                    //for the purpose of this example I will store user data on local storage
                    UserService.setUser({
                        givenName: user_data.givenName,
                        userID: user_data.userId,
                        name: user_data.displayName,
                        email: user_data.email,
                        picture: user_data.imageUrl,
                        accessToken: user_data.accessToken,
                        idToken: user_data.idToken
                    });


                    $ionicLoading.hide();
                    $state.go('home');
                },
                function (msg) {
                    $ionicLoading.hide();
                    alert(msg);
                }
            );
        };

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
    .controller('HomeCtrl', function ($scope, $state, $ionicModal, Events) {
        $scope.events = Events.all();

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
            Events.create({
                id: new Date().getTime(),
                title: event.title,
                location: event.location,
                datetime: event.datetime
            });

            console.log(Events.all());
            $scope.closeEvent();

            event.title = "";
            event.location = "";
            event.datetime = "";
        };
        // Close the event modal
        $scope.closeEvent = function () {
            $scope.eventModal.hide();
        };
        $scope.data = {
            showDelete: false
        };

        $scope.onItemDelete = function (item) {
            $scope.items.splice($scope.items.indexOf(item), 1);
        };
    })
    .controller('DetailCtrl', function ($scope, $state, $stateParams, Events) {
        console.log($stateParams.eventId);
        $scope.event = Events.get($stateParams.eventId);

        console.log($scope.event);

    })
;

