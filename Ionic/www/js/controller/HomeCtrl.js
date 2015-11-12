/**
 * Created by kalluri on 10/26/15.
 */
myapp.controller('HomeCtrl', function ($scope, $state, $ionicModal, $http) {
  $scope.events = [];

  //open our plan modal
  $scope.plan = function () {
    $scope.eventModal.show();
  };
  $scope.search = function () {
    $state.go("yelp")
  }
  //Create and load the Modal
  $ionicModal.fromTemplateUrl('views/plan.html', function (modal) {
    $scope.eventModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  //called when event is submitted
  $scope.create = function (event) {

    console.log(event)
    var url = BASE_URL+"/event";
    var result = $http.post(url,event)
    console.log(result)



    $scope.closeEvent();


  };
  // Close the event modal
  $scope.closeEvent = function () {
    $scope.eventModal.hide();
  }
})
