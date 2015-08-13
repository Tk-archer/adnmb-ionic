/**
 * Created by Fszer on 2015/7/31.
 */
AdNmb.controller('threadCtrl', ['$scope', 'Thread', '$stateParams', '$ionicLoading', '$ionicPopup',"$ionicPopover",'$timeout',
    function ($scope, Thread, $stateParams, $ionicLoading, $ionicPopup,$ionicPopover,$timeout) {

        $scope.conf={
            flag:false,
            more:false,
            loading:false
        };
        $scope.data={};
        $scope.id = $stateParams.threadId;

        $ionicPopover.fromTemplateUrl("/templates/blist.html", {scope: $scope, backdropClickToClose: true})
            .then(function (popover) {
                $scope.po = popover;
            });
        $scope.data={};
        Thread.get($stateParams.threadId, function () {
            $scope.conf.loading=true;
            $scope.data = Thread.data;
            $scope.uid=Thread.uid;
            $timeout(function () {
                $scope.conf.more=true;
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
                !flag ? $scope.conf.more = !$scope.conf.more : null;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

    }]);