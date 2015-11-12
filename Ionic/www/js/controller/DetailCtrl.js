/**
 * Created by shivanigaddala on 11/11/15.
 */
myapp.controller('DetailCtrl', function ($scope, $state, $stateParams, Events) {
    console.log($stateParams.eventId);
    $scope.event = Events.get($stateParams.eventId);

    console.log($scope.event);
});