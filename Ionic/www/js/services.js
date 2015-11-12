angular.module('services', [])
    .service('EventService', function ($http) {
        return {
            all: function (success, error) {
                $http.get(BASE_URL + "/api/event/all").then(function (data) {
                    //console.log(data);
                    success(data.data);
                }, function (err) {
                    console.log(err);
                    error(err);
                });
            }
        }
    })
    .service('UserService', function () {
        var setUser = function (user_data) {
            window.localStorage.starter_google_user = JSON.stringify(user_data);
        };

        var getUser = function () {
            return JSON.parse(window.localStorage.starter_google_user || '{}');
        };

        return {
            getUser: getUser,
            setUser: setUser
        };
    });
