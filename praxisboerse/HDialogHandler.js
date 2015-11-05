angular.module('dialogHandler', ['ngMaterial'])
    .controller('DialogController', function($scope, $mdDialog, $http, company) {



    });


function DialogController($scope, $mdDialog, company, $http) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
    $scope.getCompany = function(){
        return company;
    }
    $scope.getLong = function(){
        return 49;
    }
    $scope.getLat = function(){
        return 9;
    }

}