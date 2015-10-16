/**
 * Created by Vitali Dettling on 15.10.2015.
 */
'use strict'; //<= Was bedeudet das???                  ng-Config = Derictive???

var mainApp = angular.module('mainApp', ['base64']);//'Praxisboerse','ui.bootstrap'

/**
 * Controller for the main page.
*/
mainApp.controller('MainController',['$base64', '$scope', '$http', function($base64, $scope, $http) {

    //TODO Debug information delete after the program is working.
    $scope.DependenciesWrong = "Dependencies are Working.";
    //TODO End Debug information. Delete

    var $base64;
    var url = "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST";

    $http.defaults.headers.common.Authorization = "Basic" + $base64.encode("User" + ":" + "Pass");
    $http.post(url, 1234);

    //TODO Here implement the API
    $scope.API = $http.toString();

}]);

//Is the method called automatically???
mainApp.config(function($httpProvider) {

    // Enable Cross-Domain-Communication
    $httpProvider.defaults.useXDomain = true;
    // Enable identification
    $httpProvider.defaults.withCredentials = true;
});
