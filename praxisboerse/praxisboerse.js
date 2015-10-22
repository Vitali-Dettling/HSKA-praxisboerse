/**
 * Created by Vitali Dettling on 14.10.2015.
 */

var praxisboerse = angular.module('praxisboerse', []);

praxisboerse.controller('PraxisboerseController', ['PraxisboerseFactory','$scope', '$http', function(PraxisboerseFactory, $scope, $http) {

    //Variable had to be initialized outside a method
    var requestREST;
    var start = 0;
    //TODO It does not work exact 10 offers?
    var ende = 10;//TODO number increase to ten.
    var increment = 10;//TODO number increase to ten.
    var test = {};
    $scope.detailedInformation = function() {
        var myWindow = window.open("", "", "width=800, height=600");
        var companyInformation = JSON.stringify({
            test: {
                totalHits: "totalHits",
                offers: "offers"
            }});

       // myWindow.document.writeln(companyInformation);
        /*myWindow.document.writeln("\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n ");
        myWindow.document.writeln(companyInformation.totalHits);
        myWindow.document.writeln(companyInformation.offers);
        myWindow.document.writeln(companyInformation.offers.id);
        myWindow.document.writeln(companyInformation.companies);
        myWindow.document.writeln("\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n ");*/
        myWindow.document.writeln($scope.test.totalHits);
        myWindow.document.writeln($scope.test.offers);
       // myWindow.document.writeln($scope.responseData.offers.id);
        //myWindow.document.writeln($scope.responseData.companies);
        myWindow.document.close();
    }


    $scope.startOffers = start;//Stating index for offers is 0.
    $scope.endOffers = ende;//Default number on offers.

    $scope.nextOffers = function(){
        $scope.endOffers = $scope.endOffers + increment;
        $scope.startOffers = $scope.startOffers + increment;
    };

    $scope.type = function() {

        if ($http.defaults.headers.common.Authorization == null) {
            $scope.loginInfo = "You are not locked in!!!"
        } else {

            requestREST = PraxisboerseFactory.getTypeURL($scope.data.type, $scope.filter,  $scope.startOffers, $scope.endOffers);

            // Simple GET request.
            $http({
                method: 'GET',
                url: requestREST,
                port: 1234
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.responseData = response.data;
                //TODO Delete
                test = response.data;
                //Reset of the offers.
                if($scope.responseData.offers == 0){
                    $scope.startOffers = start;//Stating index for offers is 0.
                    $scope.endOffers = ende;//Default number on offers.
                }
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

//Am Anfang des Programmes wird die factory immer als erstes einmal durchgelaufen???
praxisboerse.factory('PraxisboerseFactory', function() {

    var server = {};
    var urlREST = "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/offers/";
   // var urlREST = "https://iwi-i-intra-01.hs-karlsruhe.de/Intranetaccess/REST/credential/encryptedpassword/";

    detectMobile = function() {
        if(window.innerWidth <= 800 && window.innerHeight <= 600) {
            return true;
        } else {
            return false;
        }
    }

    server.getTypeURL = function(type, filter, startOffers, endOffers){

        //Checks whether it is mobile device or not.
        if(!detectMobile()){
            endOffers = -1;//Returns all maches.
            startOffers = 0;//Starting index
        }

        if(angular.isDefined(filter)){
            return urlREST + type + "/" + filter + "/" + startOffers.toString()+ "/" + endOffers.toString();
        }
        else{
            return urlREST + type + "/" + startOffers.toString() + "/" + endOffers.toString();
        }
     };

    return {
        getTypeURL: function(type, filter, startOffers, endOffers) {
            return server.getTypeURL(type, filter, startOffers, endOffers);
        }
    }

});