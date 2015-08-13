/**
 * Created by Fszer on 2015/7/31.
 */
var AdNmb = angular.module('adnmb.controllers', ['adnmb.services', 'ngCordova']);


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


AdNmb.controller('sendCtrl',
    ['$scope', '$http', '$stateParams', '$ionicActionSheet', '$timeout', "reply",'$ionicPopover',
        function ($scope, $http, $stateParams, $ionicActionSheet, $timeout, reply, $ionicPopover) {
            $scope.emjos=sd(reply.emjos);
            $scope.con={};
            $scope.con.show=false;
            $scope.sen={};
            $ionicPopover.fromTemplateUrl('templates/message.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });
            $scope.emot= function ($event) {
                console.log($event.target.innerText);
                var string=$scope.form.textarea;
                var emot=$event.target.innerText;
                $scope.form.textarea=!string?emot:string+emot;
                $scope.con.show=false;
            };

            $scope.form = {};
            console.log($stateParams.target);
            $scope.send = function (data,$event) {
                $scope.form.file = document.getElementById("file").files[0];
                console.log($scope.form);
                $scope.popover.show($event);
                reply.set({
                    No: $stateParams.target,
                    content: $scope.form.textarea,
                    file: $scope.form.file
                });
                reply.send(function (data) {
                    console.log(data.code);
                    data.code==="200"? $scope.sen.ok=true:$scope.sen.errs=true;
                    $timeout(function () {
                        $scope.popover.remove();

                    },5000);

                })
            };
            $scope.img = function () {
                console.log("sd");

            }

        }]);



/**
 * Created by Fszer on 2015/7/31.
 */
AdNmb.controller('textCtrl', ['$scope', 'Plate', '$stateParams', '$ionicLoading', '$ionicPopover','$timeout',
    function ($scope, plate, $stateParams, $ionicLoading, $ionicPopover,$timeout) {
        $scope.name = $stateParams.name;

        $scope.loading=true;
        $scope.more=false;
        $ionicPopover.fromTemplateUrl("/templates/blist.html", {scope: $scope, noBackdrop: true})
            .then(function (popover) {
                $scope.po = popover;
            });
        $scope.addnew = function ($event) {
            console.log($event);
            $scope.po.show($event);
        };
        $scope.getMore=function(){
            console.log("get more");
            $scope.more=false;
            plate.update(function(flag) {

                console.log($scope.datas);
                $timeout(function () {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.more = flag;
                },3000);


            });
        };
        $scope.doRefresh= function () {
            plate.Refresh(function() {
                $scope.datas=plate.data;
                console.log($scope.datas,plate.data);
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        plate.get($stateParams.name, function () {
            $scope.datas = plate['data'];
            console.log($scope.name,plate);
            //$ionicLoading.hide();
            $scope.loading=true;
            $timeout(function () {
                $scope.more=true;
            },3000);
        });

    }]);
/**
 * Created by Fszer on 2015/7/31.
 */
AdNmb.controller('threadCtrl', ['$scope', 'Thread', '$stateParams', '$ionicLoading', '$ionicPopup',"$ionicPopover",'$timeout',
    function ($scope, Thread, $stateParams, $ionicLoading, $ionicPopup,$ionicPopover,$timeout) {
        $scope.flag = false;
        $scope.more=false;
        $scope.data={};
        $scope.id = $stateParams.threadId;

        $ionicPopover.fromTemplateUrl("/templates/blist.html", {scope: $scope, backdropClickToClose: true})
            .then(function (popover) {
                $scope.po = popover;
            });
        $scope.data={};
        Thread.get($stateParams.threadId, function () {
            $scope.data.data = Thread.data;
            //$scope.data = Thread.data;
            $timeout(function () {
                $scope.more=true;
            },3000);

        });
        $scope.jump = function () {

            $ionicPopup.prompt({
                title: "跳转到",
                subTitle: Thread.page+"/"+Thread.max,
                scope: $scope
            }).then(function(){

                Thread.jump($scope.data.response, function () {
                    $scope.data.data = Thread.data;

                })
            });

        };
        $scope.onHold= function ($event) {
            console.log($event.target);
            $scope.po.show($event.gesture.srcEvent);
        };

        $scope.doRefresh= function () {
            Thread.Refresh(function() {
                console.log($scope.data.data);
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.getMore = function () {
            console.log("update");

            Thread.update(function (flag) {
                !flag ? $scope.more = !$scope.more : null;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

    }]);