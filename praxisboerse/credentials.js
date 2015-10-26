var Login = angular.module('Login', ['base64']);

Login.controller('LoginController',['$base64', '$scope', '$http', '$window', '$rootScope', (function($base64, $scope, $http, $window, $rootScope) {

    //Variable had to be initialized outside a method
    var $base64;
    var userInfo;

    //Initial username and password, to be entered
    $scope.username = 'scse1040';
    $scope.password = 'f9ndm5We';

    isUserLoggedIn();

    $scope.login = function() {

        if ($scope.username && $scope.password) {

            $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode($scope.username + ':' +  $scope.password);

            $http({
                method: 'GET',
                url: "http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/credential/encryptedpassword/",
                port: 1234,
                transformResponse: function(data){return data;}
            }).then(function successCallback(response) {

                userInfo = {
                    accessToken: response.data,
                    userName: response.data.userName
                };


                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                $scope.response = userInfo.accessToken;


                $rootScope.isLoggedIn     = "TRUE";
                $rootScope.userLoggedIn   = $scope.username;
                $rootScope.userLoggedInPW = $scope.password;


                <!-- Now load Categories-->
                getCategories();

                <!-- User Infos-->
                getUserInfo();

                <!-- Get Countries -->
                getCountries();

            }, function errorCallback(error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.error("ERROR with Credentials: " + error.message);

                $rootScope.isLoggedIn = "";
            });
        }

    };

    //In case of browser refresh.
    function isUserLoggedIn() {
        if ($window.sessionStorage["userInfo"]) {

            userInfo = JSON.parse($window.sessionStorage["userInfo"]);

            return true;
        }
        return false;
    }

    $scope.logout = function() {

        $rootScope.isLoggedIn = "";

        $window.sessionStorage.clear();
        $window.location.reload();
    };

    function getCategories() {

        if ($http.defaults.headers.common.Authorization == null) {
            $scope.loginInfo = "You are not logged in!"
        } else {

            var requestREST = "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/offertypes/all/";

            // Simple GET request.
            $http({
                method: 'GET',
                url: requestREST,
                port: 1234
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $rootScope.kategorien = response.data;

            }, function errorCallback(error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.error("ERROR in Praxisbörse: " + error.data);
            });
        }
    }

    function getCountries() {

        if ($http.defaults.headers.common.Authorization == null) {

        } else {

            var requestREST = "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/countries/all/" ;

            $http({
                method: 'GET',
                url: requestREST,
                port: 1234
            }).then(function successCallback(response) {

                $rootScope.laender = response.data;

            }, function errorCallback(error) {

            });
        }
    }
    function getUserInfo() {

        if ($http.defaults.headers.common.Authorization == null) {
        } else {

            var requestREST = "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/credential/info/";

            $http({
                method: 'GET',
                url: requestREST,
                port: 1234
            }).then(function successCallback(response) {

                $rootScope.userFullName = response.data.firstName + " " + response.data.lastName + " (" + response.data.adsName + ")";

            }, function errorCallback(error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.error("ERROR in Praxisbörse: " + error.data);
            });
        }
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