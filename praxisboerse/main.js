'use strict';

var mainApp = angular.module('mainApp', ['Login', 'Logout', 'praxisboerse']);

/**
 * Controller for the main page.
 */
mainApp.controller('MainController', [ '$scope', '$rootScope', function( $scope, $rootScope ) {

    $scope.DependenciesWrong = "Dependencies are Working.";

    $rootScope.isLoggedIn = "";

    //TODO End Debug information. Delete

    $scope.type = function() {
        $scope.$broadcast('nextOffers');
        $scope.$broadcast('type');
    };


}]);