/**
 * Created by Vitali Dettling on 14.10.2015.
 */
'use strict';

/**
 * Main module.
 */
var mainApp = angular.module('MainApp', []);//, 'ui.bootstrap']); <- TODO Later!!!

/**
 * Controller for the main page.
 */
mainApp.controller('MainController', [ '$scope', function($scope) {

   $scope.GetStarted = "GetStarted";

}]);
