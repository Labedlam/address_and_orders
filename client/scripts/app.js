/**
 * Created by Zeo on 11/16/15.
 */
var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/address', {
            templateUrl: "/assets/views/routes/address.html",
            controller: "OneController"

        }).
        when('/order', {
            templateUrl: "/assets/views/routes/order.html",
            controller: "SomeController"
        }).

        otherwise({
            redirectTo: 'address'
        })
}]);


