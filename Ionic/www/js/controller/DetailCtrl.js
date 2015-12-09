/**
 * Created by shivanigaddala on 11/11/15.
 */
myapp.controller('DetailCtrl', function ($scope, $state, $stateParams, Events, $ionicModal, Friends, FriendsService) {
    console.log($stateParams.eventId);
    $scope.event = Events.get($stateParams.eventId);
    $scope.invitees = [];

    console.log($scope.event);

    //Create and load the Modal
    $ionicModal.fromTemplateUrl('views/inviteFriend.html', function (modal) {
        $scope.inviteModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.presentInviteFriends = function() {
        $scope.inviteModal.show()
    };

    $scope.closeModal = function() {
        $scope.inviteModal.hide()
    };
//    Friends service for showing in the modal
    $scope.friends = [];

    FriendsService.all(function (response) {

        console.log(response);
        Friends.copy(response);
        $scope.friends = response;

        console.log("Friends downloaded");
    }, function (response) {
        prompt(response);
    });
    
    $scope.invite = function (friend) {
        console.log(friend);
        $scope.invitees.push(friend);
    }
});