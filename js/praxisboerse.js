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

   //TODO Delete
   $scope.GetStarted = "GetStarted";



}]);

mainApp.config(function($httpProvider) {
   // Enable Cross-Domain-Communication
   $httpProvider.defaults.useXDomain = true;
   // Enable identification
   $httpProvider.defaults.withCredentials = true;
});

/**
 * Kapselung des Zugriffs in Form eines Dienstes.
 * Noch einfacher klappt der Zugriff auf eine REST-Schnittstelle
 * in vielen Faellen mit dem Modul ngResource.
 */
mainApp.factory('PraxisboerseService', [ '$http', function($http) {
   var server = {};
   var $base64;

   return {

      getAuthofication: function(user, pass) {
         $http.defaults.headers.common.Authorization = "Basic" + $base64.encode(user + ":" + pass);
         $http.post(url, 1234);
      }

   }





}]);





