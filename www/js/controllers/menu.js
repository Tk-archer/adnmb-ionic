/**
 * Created by Fszer on 2015/7/31.
 */
var AdNmb = angular.module('adnmb.controllers', ['adnmb.services']);


AdNmb.controller('menuCtrl', ['$scope', "menu", "config", function ($scope, menu, config) {
    menu.get(function () {
        $scope.menus = menu.list;
        console.log($scope.menus);
    });
    config.get(function () {
        $scope.configs = config.list;
    });

    $scope.flag = false;

}]);
