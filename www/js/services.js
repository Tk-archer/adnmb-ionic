/*
 * 板块里面的串列表
 *http://hacfun.tv/api/板块名?page=
 *串里面的回复列表
 *http://hacfun.tv/api/t/串号?page=
 *回复引用
 *http:/hacfun.tv/api/homepage/ref?tid=串号
 *订阅列表
 *http://hacfun.tv/api/feed?deviceToken=设备id&page=
 *取消订阅
 *http://hacfun.tv/api/feed/remove?deviceToken=设备id&&threadsId=串 id
 *添加订阅
 *http://hacfun.tv/api/feed/create?deviceToken=设备id&&threadsId=串 id
 *检查是否订阅
 *http://hacfun.tv/api/feed/check?deviceToken=设备id&&threadsId=串 id
 *
 * */

var service = angular.module('adnmb.services', []);
var host="http://hacfun.tv/api/";
var plateApi = host+"id?page=1";
var ThreadApi = host+'t/id?page=1';
var refApi = host+'/homepage/ref?tid=&callback=JSON_CALLBACK';
var replyApi = host+"t/No/create";
var NewApi = host+"api/No/create";
var test = host+"api/No/create";

service.service('Plate', ['$http', function ($http) {
    var plate = {
        id: null,
        data: null,
        page: 1,
        max: 0,
        repage: null,
        get: function (name, call) {
            console.log(plateApi.replace('id', name));
            $http.get(plateApi.replace('id', name), ["json"]).success(function (res) {
                plate.data = plate.lite(res);
                plate.page = plate.repage = 1;
                plate.id = res['forum']["name"];
                plate.max = parseInt(res['page']["size"] / 20);
                console.log(plate.max);
                call();
            }).error(function (err,data) {
                call(err,data);

            });
        },
        lite: lites,
        update: function (cb) {
            getMore(plate, plateApi, $http, cb);

        },
        Refresh: function (cb) {
            plate.get(plate.id, cb);
        }
    };
    return plate;
}]);

service.service('Thread', ['$http', function ($http) {
    var thread = {
        data: [],
        page: 1,
        max: 0,
        id: null,
        repage: null,
        uid:null,
        get: function (num, call) {

            $http.get(ThreadApi.replace('id', num), ["json"]).success(function (res) {
                thread.uid=res['threads']["uid"];
                thread.data = thread.lite(res);
                thread.data.unshift(res['threads']);
                thread.max = Math.ceil(res['threads']["replyCount"] / 20);
                thread.id = res['threads']["id"];
                thread.repage = thread.page = 1;
                call();
            });
        },
        jump: function (page, cb) {
            var url = ThreadApi.replace('id', thread.id)
                .replace("page=1", "page=" + page);
            $http.get(url, ["json"]).success(function (res) {
                thread.data = thread.lite(res);
                page == 1 ? thread.data.unshift(res['threads']) : null;
                thread.repage = thread.page = page;
                cb();
            });
        },
        Refresh: function (cb) {

            if (thread.repage - 1 == 0) {
                console.log("已经是第一页");
                return cb();
            }
            thread.repage--;
            var url = ThreadApi
                .replace('id', thread.id)
                .replace('page=1', "page=" + thread.repage);
            console.log(thread.page, url);
            $http.get(url, ["json"]).success(function (res) {
                var reply = res['replys'];
                console.log(reply);
                while (reply.length) {
                    thread.data.unshift(reply.pop());
                }
                if (thread.repage == 1) {
                    thread.data.unshift(res['threads']);
                }
                cb();
            });

        },
        lite: lites,
        update: function (cb) {
            var url;
            if (thread.page < thread.max) {
                thread.page++;
            }
            else {
                console.log("no more");
                return cb(false);
            }

            url = ThreadApi
                .replace('id', thread["id"])
                .replace('page=1', "page=" + thread.page);
            console.log(thread.page, url);
            $http.get(url, ["json"]).success(function (res) {
                res = res['replys'];
                while (res.length) {
                    thread.data.push(res.shift());
                }
                cb(true);
            });
        }
    };

    return thread;
}]);

service.service("menu", ["$http", function ($http) {
    var menus = {
        list: [],
        get: function (cb) {
            $http.get('date/list.json').success(function (data) {
                menus.list = data;
                cb();
            })
        }
    };
    return menus;
}]);

service.service("config", ["$http", function ($http) {
    var config = {
        list: [],
        get: function (cb) {
            $http.get('date/config.json').success(function (data) {
                config.list = data;
                cb();
            })
        }
    };
    return config;
}]);

service.service("reply", [ function () {
    var reply = {
        content: "",
        file: null,
        data: "",
        No: null,
        Url: null,
        emjos: ["|∀ﾟ", "(´ﾟДﾟ`)", "(;´Д`)", "(｀･ω･)", "(=ﾟωﾟ)=", "| ω・´)", "|-` )", "|д` )", "|ー` )", "|∀` )", "(つд⊂)", "(ﾟДﾟ≡ﾟДﾟ)", "(＾o＾)ﾉ", "(|||ﾟДﾟ)", "( ﾟ∀ﾟ)", "( ´∀`)", "(*´∀`)", "(*ﾟ∇ﾟ)", "(*ﾟーﾟ)", "(　ﾟ 3ﾟ)", "( ´ー`)", "( ・_ゝ・)", "( ´_ゝ`)", "(*´д`)", "(・ー・)", "(・∀・)", "(ゝ∀･)", "(〃∀〃)", "(*ﾟ∀ﾟ*)", "( ﾟ∀。)", "( `д´)", "(`ε´ )", "(`ヮ´ )", "σ`∀´)", " ﾟ∀ﾟ)σ", "ﾟ ∀ﾟ)ノ", "(╬ﾟдﾟ)", "(|||ﾟдﾟ)", "( ﾟдﾟ)", "Σ( ﾟдﾟ)", "( ;ﾟдﾟ)", "( ;´д`)", "(　д ) ﾟ ﾟ", "( ☉д⊙)", "(((　ﾟдﾟ)))", "( ` ・´)", "( ´д`)", "( -д-)", "(>д<)", "･ﾟ( ﾉд`ﾟ)", "( TдT)", "(￣∇￣)", "(￣3￣)", "(￣ｰ￣)", "(￣ . ￣)", "(￣皿￣)", "(￣艸￣)", "(￣︿￣)", "(￣︶￣)", "ヾ(´ωﾟ｀)", "(*´ω`*)", "(・ω・)", "( ´・ω)", "(｀・ω)", "(´・ω・`)", "(`・ω・´)", "( `_っ´)", "( `ー´)", "( ´_っ`)", "( ´ρ`)", "( ﾟωﾟ)", "(oﾟωﾟo)", "(　^ω^)", "(｡◕∀◕｡)", "/( ◕‿‿◕ )\\", "ヾ(´ε`ヾ)", "(ノﾟ∀ﾟ)ノ", "(σﾟдﾟ)σ", "(σﾟ∀ﾟ)σ", "|дﾟ )", "┃電柱┃", "ﾟ(つд`ﾟ)", "ﾟÅﾟ )　", "⊂彡☆))д`)", "⊂彡☆))д´)", "⊂彡☆))∀`)", "(´∀((☆ミつ"],
        set: function (re) {
            var res = /^[0-9]+.?[0-9]*$/;
            reply.No = re.No;
            reply.Url = res.test(reply.No) ? replyApi : NewApi;
            reply.Url = reply.Url.replace("No", reply.No);
            reply.content = re.content;
            reply.file = re.file;
            console.log(reply);
            reply.payload();
        },
        payload: function () {

            reply.data = new FormData();
            reply.data.append("content", reply.content);
            if( reply.file)
                reply.data.append("image", reply.file);
        },
        send: function (cb) {
            $.ajax({
                url: reply.Url,
                type: 'POST',
                data: reply.data,
                contentType: false,
                processData: false
            }).success(function (end,status,code) {
                console.log("ok",code);
                cb(code.responseJSON);
            }).error(function (err) {
                console.log(err);
                cb(err.responseJSON);
            });


        },
        glups:function (list) {
            var s = 0;
            var tmp = [];
            var res = [];
            while (list.length) {
                tmp.push(list.shift());
                s++;
                if (s == 3) {
                    res.push(tmp);
                    tmp = [];
                    s = 0;
                }
            }
            s ? res.push(tmp) : null;
            return res;
        }
    };
    return reply;
}]);

getMore = function (obj, api, http, cb) {
    var url;
    if (obj.page < obj.max) {
        obj.page++;
    }
    else {
        console.log("no more");
        return cb(false);
    }
    url = api
        .replace('id', obj["id"])
        .replace('page=1', "page=" + obj.page);
    http.get(url, ["json"]).success(function (res) {
        res = obj.lite(res);
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            obj.data.push(res[i]);
        }
        cb(true);
    });
};

lites = function (res) {
    var list = [];
    res = res["replys"] || res["data"]['threads'];
    while (res.length) {
        var tmp = res.shift();
        list.push({
            uid: tmp["uid"],
            id: tmp["id"],
            image: tmp["image"],
            thumb: tmp["thumb"],
            content: tmp["content"],
            replyCount: tmp["replyCount"],
            createdAt: tmp["createdAt"]
        });
    }
    return list;
};

function sd(list) {
    var s = 0;
    var tmp = [];
    var res = [];
    while (list.length) {
        tmp.push(list.shift());
        s++;
        if (s == 3) {
            res.push(tmp);
            tmp = [];
            s = 0;
        }
    }
    s ? res.push(tmp) : null;
    return res;
}