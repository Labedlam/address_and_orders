///**
// * Created by Zeo on 11/16/15.
// */
// Here we are setting the controller to communicate to specific place with-in the application
myApp.controller('OneController', ['$scope','$http', function($scope, $http){
    console.log("One Controller");

    //Scopes for calling data and sending it to the DOM

    $scope.user=[];
    $scope.addresses=[];
    $scope.users={};

    // Send get call to the server to collect user data
    $scope.getData = function(){
        $http.get('/people/').then(function(response){
            $scope.users = response.data;


            console.log(response.data);
            console.log("here is values",$scope.users);
            console.log("what is user",$scope.user);
        });
    };



// Send call to server to collect address data
    $scope.getAddresses=function(object) {
        //console.log("here is what gets passed to the function",$scope.user, $scope.users, $scope.users.id);id
            $http({
            url: '/addresses/',
            method:'GET',
            params:{
                userID:$scope.user.id,

            }
        }).then(function(response){
            //console.log(response);
            //console.log("what is scope user id",$scope.users.id);
            $scope.addresses =response.data;
        });
    };

    $scope.getData();


}]);

//{params: {id: deletedID}}