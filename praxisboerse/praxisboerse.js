/**
 * Created by Vitali Dettling on 14.10.2015.
 */

var praxisboerse = angular.module('praxisboerse', []);

praxisboerse.controller('PraxisboerseController', ['PraxisboerseFactory','$scope', '$http', function(PraxisboerseFactory, $scope, $http) {

    //Variable had to be initialized outside a method
    var requestREST;
    var start = 0;
    var count = 10;
    var increment = 10;
    var reset;

    $scope.detailedInformationOffer = function(infoOffers) {
        var myWindow = window.open("", "", "resizable=1", "width=200", "height=100");
        angular.forEach($scope.responseData.companies, function (offers) {
            if(offers.companyName == infoOffers.companyName) {
                myWindow.document.writeln(offers.description);
            }
        });
    }

    $scope.detailedInformationCompany = function(infoCompany) {
        var myWindow = window.open("", "", "resizable=1", "width=200", "height=100");
        angular.forEach($scope.responseData.companies, function (infoCompanies) {
            if(infoCompany.companyName == infoCompanies.companyName) {
                myWindow.document.writeln("Comapny Name: " + infoCompany.companyName + "</br>");
                myWindow.document.writeln("City: " + infoCompany.city + "</br>");
                myWindow.document.writeln("Street: " + infoCompany.street + "</br>");
                myWindow.document.writeln("Country: " + infoCompany.country + "</br>");
                myWindow.document.writeln("Zip Code: " + infoCompany.zipCode + "</br>");
                myWindow.document.writeln("Employees: " + infoCompany.numberOfEmployees + "</br>");
                myWindow.document.writeln("Website: " + infoCompany.website + "</br>");
            }
        });
    }

    $scope.startOffers = start;//Stating index for offers is 0.

    $scope.nextOffers = function(){

        if(reset == 0) {
            $scope.startOffers = 0;
        }else{
            $scope.startOffers = $scope.startOffers + increment;
        }
    };

    $scope.type = function() {

        if ($http.defaults.headers.common.Authorization == null) {
            $scope.loginInfo = "You are not locked in!!!"
        } else {

            requestREST = PraxisboerseFactory.getTypeURL($scope.data.type, $scope.filter,  $scope.startOffers, count);

            // Simple GET request.
            $http({
                method: 'GET',
                url: requestREST,
                port: 1234
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.responseData = response.data;
                //Reset of the offers.
                reset = $scope.responseData.offers;
            }, function errorCallback(error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.error("ERROR: Praxisbörse: " + error.data);
            });
        }
    };

    //Listener when broadcasting.
    $scope.$on('nextOffers', function(event) {$scope.nextOffers();});
    $scope.$on('type', function(event) {$scope.type();});
}]);

praxisboerse.factory('PraxisboerseFactory', function() {

    var server = {};
    var urlREST = "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/offers/";
  //var urlREST = "https://iwi-i-intra-01.hs-karlsruhe.de/Intranetaccess/REST/credential/encryptedpassword/";

    //Detect whether it is a mobile device or an browse.
    detectMobile = function() {
        if(window.innerWidth <= 800 && window.innerHeight <= 600) {
            return true;
        } else {
            return false;
        }
    }

    server.getTypeURL = function(type, filter, startOffers, count){

        //Checks whether it is mobile device or not.
        if(!detectMobile()){
            count = -1;//Returns all maches.
            startOffers = 0;//Starting index
        }

        if(angular.isDefined(filter)){
            return urlREST + type + "/" + filter + "/" + startOffers.toString()+ "/" + count.toString();
        }
        else{
            return urlREST + type + "/" + startOffers.toString() + "/" + count.toString();
        }
     };

    return {
        getTypeURL: function(type, filter, startOffers, count) {
            return server.getTypeURL(type, filter, startOffers, count);
        }
    }

});