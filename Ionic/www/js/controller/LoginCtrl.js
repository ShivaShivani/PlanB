/**
 * Created by kalluri on 10/27/15.
 */
myapp.controller('LoginCtrl', function ($scope, $state, $http, $httpParamSerializerJQLike, UserService, $ionicLoading) {
    $scope.pageClass = 'login';

    //This method will be executed when user press the" Login with userId and Password"
    $scope.login = function (username, Password) {
        var urlst = BASE_URL+"/user?username=" + username + "&password=" + Password;
        console.log(urlst);
        var request = {
            method: "GET",
            url: urlst
        };
        $http(request).then(function (response) {
            console.log(response);
            if (response.data.status == 'success') {
                $state.go("app.home")
            }
            else {
                $state.go("login")
            }
        })
    };
    $scope.register = function () {
        $state.go('register')
    };
    //This method is executed when the user press the "Login with Google" button
    $scope.googleSignIn = function () {
        $ionicLoading.show({
            template: 'Logging in...'
        });

        window.plugins.googleplus.login(
            {},
            function (user_data) {
                console.log(user_data);
                alert(JSON.stringify(user_data));

                var term = null;
                $http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + user_data.oauthToken).
                    then(function (response) {
                        console.log(response)
                        // this callback will be called asynchronously
                        // when the response is available'
                        alert("success");
                    }, function (response) {
                        console.log(response)
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        alert("failed");
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
                $state.go('app.home');
            },
            function (msg) {
                $ionicLoading.hide();
                alert(msg);
            }
        );
    };

})