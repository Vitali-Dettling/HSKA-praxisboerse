angular.module('dialogHandler', ['ngMaterial'])
    .controller('DialogController', function($scope, $mdDialog, company) {

    });


function DialogController($scope, $mdDialog, company) {
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