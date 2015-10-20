/**
 * Created by Vitali Dettling on 14.10.2015.
 */

var credentials = angular.module('Credentials', ['base64']);

credentials.controller('LoginController',['$base64', '$scope', '$http', '$window', function($base64, $scope, $http, $window) {

    //Variable had to be initialized outside a method
    var $base64;

    //Initial username and password, to be entered.00
    $scope.username = 'devi1015';
    $scope.password = 'w4z96sY2';

    $scope.login = function() {

        //If both credentials are included in the text box.
        if ($scope.username && $scope.password) {

            $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(this.username + ":" + this.password);
            // Simple GET request.
            $http({
                method: 'GET',
                url: "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/credential/encryptedpassword/",
                port: 1234
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.response = response;
            }, function errorCallback(error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.error = error;
            });

            $scope.username = '';
            $scope.password = '';
        }
    };


    $scope.logout = function() {
        delete $window.sessionStorage.token;

    }
}]);

//Is the method called automatically???
credentials.config(function($httpProvider) {

    // Enable Cross-Domain-Communication
    $httpProvider.defaults.useXDomain = true;
    // Enable identification
    $httpProvider.defaults.withCredentials = true;
});

