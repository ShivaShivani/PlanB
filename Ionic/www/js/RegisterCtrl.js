/**
 * Created by kalluri on 10/25/15.
 */
myapp.controller('RegisterCtrl',function($http, $state,$scope){

$scope.home= function(user){
  console.log(user)
  var url = "http://localhost:9080/mongobasic/user";
  var result = $http.post(url,user)
  console.log(result)

  $state.go('login')
  var request = {
    method:"GET",
    url: (url,user)


  }

  $http(request).then(function(response){

    console.log(response)
    if (response.data.status == 'success') {
      console.log('going')
      $state.go("login")
    }
    else {
      $state.go("register")
    }
  })

}

}
)
