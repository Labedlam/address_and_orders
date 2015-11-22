/**
 * Created by Zeo on 11/16/15.
 */
myApp.controller('SomeController', ['$scope','$http', function($scope,$http){
    console.log(" SomeController");

    $scope.orders = [];
    $scope.user = {};
    $scope.ordersTotal = 0;
    $scope.users=[];

    $scope.getOrders = function(object) {

        console.log("Here is user id for http get",$scope.user);
        $http({
            url: '/orders/',
            method: 'GET',
            params: {
                userID: $scope.user.id,
                startDate: $scope.user.startDate,
                endDate: $scope.user.endDate
            }
        }).then(
            function(response) {
                updateTotal(response.data);
                $scope.orders = response.data;
            });
    };

    function updateTotal(data) {
        $scope.ordersTotal = 0;
        for (var i = 0; i < data.length; i++) {
            $scope.ordersTotal += parseFloat(data[i].amount);
        }
    }

    var getUsers = function() {
        $http.get('/people/').then(
            function(response) {
                console.log(response.data);
                $scope.users = response.data;
            });
    };

    getUsers();




}]);