
AdNmb.controller('sendCtrl',
    ['$scope', '$http', '$stateParams', '$ionicActionSheet', '$timeout', "reply",'$ionicPopover',
        function ($scope, $http, $stateParams, $ionicActionSheet, $timeout, reply, $ionicPopover) {
            $scope.emjos=reply.glups(reply.emjos);
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

                $scope.popover.show($event);
                reply.set({
                    No: $stateParams.target,
                    content: $scope.form.textarea,
                    file: $scope.form.file
                });
                reply.send(function (data) {
                    console.log(data);
                    data!=="错误"? $scope.sen.ok=true:$scope.sen.errs=true;
                    $timeout(function () {
                        $scope.popover.remove();

                    },300);

                })
            };


        }]);


