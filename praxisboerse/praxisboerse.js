/**
 * Created by Vitali Dettling on 14.10.2015.
 */

var praxisboerse = angular.module('praxisboerse', ['base64']);

praxisboerse.controller('PraxisboerseController', ['PraxisboerseFactory', '$base64', '$scope', '$http', function(PraxisboerseFactory, $base64, $scope, $http) {

    //Variable had to be initialized outside a method
    var $base64;
    var typeURL;

   // $scope.filter = "Here Filter Text...";

    $scope.type = function() {

        if ($http.defaults.headers.common.Authorization == null) {
            $scope.loginInfo = "You are currently not locked in!!!"
        } else {

            typeURL = PraxisboerseFactory.getTypeURL($scope.data.type);

            // Simple GET request.
            $http({
                method: 'GET',
                url: typeURL,
                port: 1234
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.responseData = response.data;
            }, function errorCallback(error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.error = error;
            });

            $scope.username = '';
            $scope.password = '';

        }
    };
}]);

//Am Anfang des Programmes wird die factory immer als erstes einmal durchgelaufen???
praxisboerse.factory('PraxisboerseFactory', function() {
    var type = this;
    var server = {};

    server.getTypeURL = function(type){

        switch (type) {
            case "internship":
                self.type = 'internship/0/10/'
                break;
            case "joboffer":
                self.type = 'joboffer/0/10/';
                break;
            case "workingstudent":
                self.type = 'workingstudent/0/10/';
                break;
            case "thesis":
                self.type = 'thesis/0/10/';
                break;
            default:
                console.log('ERROR: Server type is not correct.');
        }

        return "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/offers/" + self.type;
     };

    return {
        getTypeURL: function(type) {
            return server.getTypeURL(type);
        }
    }

});