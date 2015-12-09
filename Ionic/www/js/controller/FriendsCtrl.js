/**
 * Created by shivanigaddala on 11/11/15.
 */
myapp.controller('FriendsCtrl', function ($scope, $state, $stateParams, $ionicModal, $http, Friends, FriendsService) {
    console.log("Friends");

    $scope.friends = [];

    FriendsService.all(function (response) {

        Friends.copy(response);
        $scope.friends = response;

        console.log("Friends downloaded");
    }, function (response) {
        prompt(response);
    });

    //open our addFriend modal
    $scope.addFriend = function () {
        $scope.addFriendModal.show();
    };

    //Create and load the Modal
    $ionicModal.fromTemplateUrl('views/addFriend.html', function (modal) {
        $scope.addFriendModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    //called when friend is submitted
    $scope.createFriend = function (friend) {
        console.log(friend);
        var f = {
            id: new Date().getTime(),
            name: friend.name,
            emailId: friend.emailId,
            phone: friend.phone
        };
        var url = BASE_URL + "/friends";
        var result = $http.post(url, f);
        console.log(result);

        Friends.create(f);

        $scope.friends = Friends.all();
        console.log(Friends.all());
        $scope.closeFriend();

        friend.name = "";
        friend.emailId = "";
        friend.phone = "";
        $scope.closeFriend();
    };
    // Close the event modal
    $scope.closeFriend = function () {
        $scope.addFriendModal.hide();
    };

});