/**
 * Created by Vitali Dettling on 14.10.2015.
 */

var Login = angular.module('Login', ['base64']);



Login.controller('LoginController',['$base64', '$scope', '$http', '$window', (function($base64, $scope, $http, $window) {

    //Variable had to be initialized outside a method
    var $base64;
    var userInfo;

    //Initial username and password, to be entered.00
    $scope.username = 'user';
    $scope.password = 'pass';

    $scope.login = function() {

        //In case of a browser refresh.
        isUserLockedIn();

        //If both credentials are included in the text box.
        if ($scope.username && $scope.password) {

            $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode($scope.username + ':' +  $scope.password);
            //Simple GET request.
            $http({
                method: 'GET',
                url: "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/credential/encryptedpassword/",
                //url: "https://iwi-i-intra-01.hs-karlsruhe.de/Intranetaccess/REST/credential/encryptedpassword/",
                port: 1234
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                userInfo = {
                    accessToken: response.data,
                    userName: response.data.userName
                }
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                $scope.response = userInfo.accessToken;
            }, function errorCallback(error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.error("ERROR: Credenitals: " + error.message);
            });
        }
        $scope.username = '';
        $scope.password = '';
    }

    //In case of browser refresh.
    function isUserLockedIn() {
        if ($window.sessionStorage["userInfo"]) {
            //TODO after the browser refresh the userInfo is not doing anything.
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            return true;
        }
        return false;
    }

})]);

Login.config(function($httpProvider) {

    // Enable Cross-Domain-Communication
    $httpProvider.defaults.useXDomain = true;
    // Enable identification
    $httpProvider.defaults.withCredentials = true;
});


var Logout = angular.module('Logout', []);

Logout.controller('LogoutController', ['$scope', '$window', (function($scope, $window){

    $scope.logout = function() {

        $window.sessionStorage.clear();
        $window.location.reload();
    };
})]);



