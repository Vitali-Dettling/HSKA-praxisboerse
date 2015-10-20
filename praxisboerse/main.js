/**
 * Created by Vitali Dettling on 15.10.2015.
 */
'use strict'; //<= Was bedeudet das???                  ng-Config = Derictive???

var mainApp = angular.module('mainApp', ['Credentials']);//'Praxisboerse','ui.bootstrap'

/**
 * Controller for the main page.
 */           ///Unterschied zwischen ' und "? //Was bedeuten diese parameter!!!
mainApp.controller('MainController', [ '$scope', function( $scope ) {
    //TODO Debug information delete after the program is working.
    $scope.DependenciesWrong = "Dependencies are Working.";
    //TODO End Debug information. Delete

}]);