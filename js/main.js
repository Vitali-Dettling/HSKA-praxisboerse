/**
 * Created by Vitali Dettling on 15.10.2015.
 */
'use strict'; //<= Was bedeudet das???                  ng-Config = Derictive???

var mainApp = angular.module('mainApp', ['base64']);//'Praxisboerse','ui.bootstrap'

/**
 * Controller for the main page.
*/           ///Unterschied zwischen ' und "? //Was bedeuten diese parameter!!!
mainApp.controller('MainController',['$base64', '$scope', '$http', function($base64, $scope, $http) {

    //TODO Debug information delete after the program is working.
    $scope.DependenciesWrong = "Dependencies are Working.";
    //TODO End Debug information. Delete

    var $base64;
    $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode("user" + ":" + "pass");
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
}]);

//Is the method called automatically???
mainApp.config(function($httpProvider) {

    // Enable Cross-Domain-Communication
    $httpProvider.defaults.useXDomain = true;
    // Enable identification
    $httpProvider.defaults.withCredentials = true;
});
