/**
 * Created by Fszer on 2015/7/31.
 */
AdNmb.controller('threadCtrl', ['$scope', 'Thread', '$stateParams', '$ionicLoading', '$ionicPopup',"$ionicPopover",'$timeout',
    function ($scope, Thread, $stateParams, $ionicLoading, $ionicPopup,$ionicPopover,$timeout) {

        $scope.conf={
            flag:false,
            more:false,
            loading:false,
            top:false
        };
        $scope.data={};
        $scope.id = $stateParams.threadId;
        $scope.main={};
        $ionicPopover.fromTemplateUrl("/templates/blist.html", {scope: $scope, backdropClickToClose: true})
            .then(function (popover) {
                $scope.po = popover;
            });

        Thread.get($stateParams.threadId, function () {
            $scope.conf.loading=true;
            $scope.main = Thread.data;
            $scope.uid=Thread.uid;
            $timeout(function () {
                $scope.conf.more=true;
            },3000);

        });
        $scope.jump = function () {
            $scope.po.hide();
            $ionicPopup.prompt({
                title: "跳转到",
                subTitle: Thread.page+"/"+Thread.max,
                scope: $scope
            }).then(function(){
                if(!$scope.data.response||$scope.data.response===Thread.page)
                    return ;
                Thread.jump($scope.data.response, function () {
                    console.log(Thread.data);
                    $scope.main = Thread.data;

                })
            });

        };
        $scope.onHold= function ($event) {
            console.log($event.target);
            $scope.po.show($event.gesture.srcEvent);
        };

        $scope.doRefresh= function () {
            Thread.Refresh(function() {
                console.log($scope.main);
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