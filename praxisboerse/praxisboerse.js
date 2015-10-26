var praxisboerse = angular.module('praxisboerse', [ 'ngMaterial' ]);

praxisboerse.controller('PraxisboerseController', ['PraxisboerseFactory','$scope', '$http', '$rootScope','$base64', function(PraxisboerseFactory, $scope, $http, $rootScope, $base64) {

    //Variable had to be initialized outside a method
    var requestREST;
    var start       = 0;
    var count       = 10;
    var increment   = 10;
    var reset;

    $scope.detailedInformationOffer = function(offer) {
        var myWindow = window.open("", "", "resizable=1", "width=200", "height=100");
                myWindow.document.writeln(offer.description);
    };

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
    };

    $scope.addToMerkzettel = function(offer) {

        //$http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode($rootScope.userLoggedIn + ':' +  $rootScope.userLoggedInPW);

        if ($http.defaults.headers.common.Authorization == null) {

        } else {

            requestREST = "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/notepad/offer/";

            $http({
                method: 'POST',
                url: requestREST,
                data: offer,
                headers : {'Content-Type':'application/json'}
            }).then(function successCallback(response) {

                // nothing to do here!

            }, function errorCallback(error) {

            });
        }

    };



    $scope.startOffers = start;

    $scope.nextOffers = function(){

        if(reset == 0) {
            $scope.startOffers = 0;
        }else{
            $scope.startOffers = $scope.startOffers + increment;
        }
    };

    $scope.type = function() {

        // set country filter
        $rootScope.fland = this.land;

        // remove status for Merkzettel (-> Angebote)
        $rootScope.isMerkzettel = "";

        if ($http.defaults.headers.common.Authorization == null) {
            $scope.loginInfo = "You are not logged in!"
        } else {

            requestREST = PraxisboerseFactory.getTypeURL($scope.kategorie, $scope.filter,  $scope.startOffers, count);

            $http({
                method: 'GET',
                url: requestREST,
                port: 1234
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $rootScope.responseData = response.data;
                //Reset of the offers.
                reset = $rootScope.responseData.offers;

            }, function errorCallback(error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.error("ERROR in Praxisbörse: " + error.data);
            });
        }
    };


    $scope.showMerkzettel = function() {

        $rootScope.isMerkzettel = "TRUE";

        if ($http.defaults.headers.common.Authorization == null) {
            $scope.loginInfo = "You are not logged in!"
        } else {

            requestREST = "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/notepad/" + $scope.startOffers + "/" + count + "/";

            $http({
                method: 'GET',
                url: requestREST,
                port: 1234
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $rootScope.responseData = response.data;
                //Reset of the offers.
                reset = $rootScope.responseData.offers;

            }, function errorCallback(error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.error("ERROR in Praxisbörse: " + error.data);
            });
        }
    };

    $scope.removeMerkzettel = function(offerId) {

        if ($http.defaults.headers.common.Authorization == null) {

        } else {

            requestREST = "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/notepad/offer/" + offerId + "/";

            $http({
                method: 'DELETE',
                url: requestREST,
            }).then(function successCallback(response) {

                $scope.showMerkzettel();

            }, function errorCallback(error) {

            });
        }
    };


    //Listen when broadcasting
    $scope.$on('nextOffers', function(event) {$scope.nextOffers();});
    $scope.$on('type', function(event) {$scope.type();});
}]);

praxisboerse.factory('PraxisboerseFactory', function() {

    var server = {};
    var urlREST = "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/joboffer/offers/";

    //Detect whether it is a mobile device or an browse.
    detectMobile = function() {
        if(window.innerWidth <= 800 && window.innerHeight <= 600) {
            return true;
        } else {
            return false;
        }
    };

    server.getTypeURL = function(type, filter, startOffers, count){

        //Checks whether it is mobile device or not.
        if(!detectMobile()){
            count = -1;//Returns all matches
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