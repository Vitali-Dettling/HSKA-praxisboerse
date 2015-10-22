/**
 * Created by Vitali Dettling on 15.10.2015.
 */
'use strict';

var mainApp = angular.module('mainApp', ['Login', 'Logout', 'praxisboerse']);//'ui.bootstrap'

/**
 * Controller for the main page.
 */
mainApp.controller('MainController', [ '$scope', function( $scope ) {
    //TODO Debug information delete after the program is working.
    $scope.DependenciesWrong = "Dependencies are Working.";
    //TODO End Debug information. Delete

    $scope.type = function() {
        $scope.$broadcast('nextOffers');
        $scope.$broadcast('type');
    };


}]);