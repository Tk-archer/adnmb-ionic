/**
 * Created by Fszer on 2015/7/31.
 */
AdNmb.controller('textCtrl', ["$http",'$scope', 'Plate', '$stateParams', '$ionicLoading', '$ionicPopover','$timeout',
    function ($http,$scope, plate, $stateParams, $ionicLoading, $ionicPopover,$timeout) {
        $scope.name = $stateParams.name;
        $scope.conf={
            loading:false,
            more:false,

        };
        $ionicPopover.fromTemplateUrl("/templates/blist.html", {scope: $scope, noBackdrop: true})
            .then(function (popover) {
                $scope.po = popover;
            });
        $scope.getMore=function(){
            console.log("get more");
            $scope.conf.more=false;
            plate.update(function(flag) {

                console.log($scope.datas);
                $timeout(function () {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.conf.more = flag;
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

        plate.get($stateParams.name, function (err,daa) {
            $scope.datas = plate['data'];
            $scope.conf.loading=true;
            $timeout(function () {
                $scope.conf.more=true;
            },3000);
        });

    }]);