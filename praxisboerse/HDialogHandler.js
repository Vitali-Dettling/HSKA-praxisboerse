angular.module('dialogHandler', ['ngMaterial','uiGmapgoogle-maps'])
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



}