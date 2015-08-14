/**
 * Created by Fszer on 2015/7/2.
 */
var ImgCdn='http://cdn.ovear.info:8999/';
var AcFilter=angular.module('AcFilter',[]);
AcFilter.filter('toHtml', ['$sce',function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    };
}]);



AcFilter.filter('img', function () {
    return function (input) {

        return input?ImgCdn+input:null;
    };
});

AcFilter.filter('no', function () {
    return function (input) {

        return "NO."+input;
    };
});

AcFilter.filter('po', function () {
    return function (input,id) {
        return id===input?input+"(po)":input;
    };
});