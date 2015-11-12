/**
 * Created by shivanigaddala on 11/11/15.
 */
myapp.controller('ProfileCtrl', function ($scope, $state, $stateParams) {
    console.log("Profile");
    console.log(User.getInstance());
    $scope.user = User.getInstance().data;
    console.log($scope.user);
});