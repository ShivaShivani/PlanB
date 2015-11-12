/**
 * Created by shivanigaddala on 11/11/15.
 */

myapp.controller('AppCtrl', function ($scope, $state, $stateParams) {
    $scope.logout = function () {
        console.log("Logged Out");
        User.getInstance().data = {};
        $state.go('login');
    }
});