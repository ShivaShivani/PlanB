/**
 * Created by kalluri on 10/26/15.
 */
myapp.controller('HomeCtrl', function ($scope, $state, $ionicModal, $http, Events, EventService) {
    $scope.events = [];

    EventService.all(function(response) {

        Events.copy(response);
        $scope.events = response;

        console.log("Events downloaded");
    }, function (response) {
        prompt(response);
    });

    //open our plan modal
    $scope.plan = function () {
        $scope.eventModal.show();
    };
    $scope.search = function () {
        $state.go("yelp")
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
        console.log(event);
        var e = {
            id: new Date().getTime(),
            title: event.title,
            location: event.location,
            datetime: event.datetime
        };
        var url = BASE_URL + "/event";
        var result = $http.post(url, e);
        console.log(result);

        Events.create(e);

        $scope.events = Events.all();
        console.log(Events.all());
        $scope.closeEvent();

        event.title = "";
        event.location = "";
        event.datetime = "";
        $scope.closeEvent();
    };
    // Close the event modal
    $scope.closeEvent = function () {
        $scope.eventModal.hide();
    };
});
