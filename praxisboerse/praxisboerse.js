/**
 * Created by Vitali Dettling on 14.10.2015.
 */


var praxisboerse = angular.module('Praxisboerse', []);


praxisboerse.config(function($httpProvider) {
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
praxisboerse.factory('PraxisboerseService', [ '$http', function($http) {
   var server = {};
   var $base64;
   var url = "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST";


   return {

      getAuthofication: function(user, pass) {
         $http.defaults.headers.common.Authorization = "Basic" + $base64.encode(user + ":" + pass);
         $http.post(url, 1234);
      }

   }





}]);





