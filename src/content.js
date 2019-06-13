var r1 = document.getElementById("result_1");
var r2 = document.getElementById("result_2");
var r3 = document.getElementById("result_3");
var r4 = document.getElementById("result_4");
var r5 = document.getElementById("result_5");
var rlist = [r1, r2, r3, r4, r5];
var r_array = new Array();
var change = 0;
var change02 = 0;
var db_len;
var area_x1, area_y1, area_x2, area_y2;

var db = openDatabase('info_db2', '1.0', 'Test DB', 8 * 1024 * 1024);

function introduction() {
    console.log("点击成功");
    layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        area: ["500px", "200px"],
        content: $('#teamIntroduction'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function () {
            // layer.msg('开始操作吧~');
        }
    });
}

function useHelp() {
    console.log("点击成功");
    layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        area: ["800px", "350px"],
        content: $('#instruction'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function () {
            // layer.msg('开始操作吧~');
        }
    });
}

function initMap() {
    createMap();
    setMapEvent();
    addMapControl();
    initDatabase();
}

function startQuery01() {
    if (change == 0) {
        $("#startQuery02").hide();
        $("#test").show();
        $(".test01").show();
        $("#note").css("top", "310px");
        $(".mapPosition").css("margin-top", "-20px");
        // $("#startQuery02").css("margin-right", "0px");
        $("#startQuery").text("收起");
        change += 1;
    } else {
        $("#test").hide();
        $(".test01").hide();
        $("#startQuery02").show();
        $("#note").css("top", "220px");
        $(".mapPosition").css("margin-top", "-50px");
        $("#startQuery02").css("margin-right", "30vw");
        $("#startQuery").text("标点查询");
        change -= 1;
    }
}

function startQuery02() {
    if (change02 == 0) {
        $("#startQuery").hide();
        $(".test01").show();
        $("#selectTwoPoint").show();
        $("#note").css("top", "330px");
        $(".mapPosition").css("margin-top", "0px");
        $("#startQuery02").css("margin-right", "0px");
        $("#startQuery02").text("收起");
        change02 += 1;
    } else {
        $(".test01").hide();
        $("#selectTwoPoint").hide();
        $("#startQuery").show();
        $("#note").css("top", "220px");
        $(".mapPosition").css("margin-top", "-50px");
        $("#startQuery02").css("margin-right", "30vw");
        $("#startQuery02").text("两点查询");
        change02 -= 1;
    }

}

function initMap() {
    createMap();
    setMapEvent();
    addMapControl();
    initDatabase();
}

function createMap() {
    var map = new BMap.Map("dituContent", {enableMapClick: false});
    var point = new BMap.Point(101.85934, 26.67);
    map.centerAndZoom(point, 10);
    map.addControl(new BMap.MapTypeControl({
        mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]
    }));
    map.setMapType(BMAP_HYBRID_MAP);
    window.map = map;

    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS INFOS');
    }, null)

    var size = new BMap.Size(60, 20);
    map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,
    }));
}

function initDatabase() {
    db_len = 0;
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS INFOS (info_id primary key , lon1, lat1, lon2, lat2, article_name, article_author, superposition)');
        tx.executeSql('INSERT INTO INFOS (info_id, lon1, lat1, lon2, lat2, article_name, article_author, superposition) VALUES (1, 101.8539, 26.6844, 101.9044, 26.6387, "攀枝花盐边县矿产地质调查项目", "中国地质调查成果快讯", 0)');
        tx.executeSql('INSERT INTO INFOS (info_id, lon1, lat1, lon2, lat2, article_name, article_author, superposition) VALUES (2, 101.45, 26.35, 101.47, 26.38, "攀枝花钒钛铁矿地质勘探报告", "西南地质局531队", 0)');
        tx.executeSql('INSERT INTO INFOS (info_id, lon1, lat1, lon2, lat2, article_name, article_author, superposition) VALUES (3, 101.30, 26.30, 101.48, 26.70, "攀枝花钒钛磁铁矿储量计算报告书", "四川省地质局攀枝花队", 0)');
        tx.executeSql('INSERT INTO INFOS (info_id, lon1, lat1, lon2, lat2, article_name, article_author, superposition) VALUES (4, 101.8630, 26.65, 101.9630, 26.85, "四川省攀枝花盐边县地质灾害详细调查成果报告", "四川九O九建设有限公司", 0)');
        tx.executeSql('INSERT INTO INFOS (info_id, lon1, lat1, lon2, lat2, article_name, article_author, superposition) VALUES (5, 101.7830, 26.6838, 101.8815, 26.6040, "四川省盐边县中梁子钒钛磁铁矿区勘探地质报告", "四川省冶金地质勘查局601大队", 0)');
        tx.executeSql('INSERT INTO INFOS (info_id, lon1, lat1, lon2, lat2, article_name, article_author, superposition) VALUES (6, 101.7615, 26.6500, 101.8930, 26.6640, "四川省盐边县中干沟矿区钒钛磁铁矿勘探报告", "四川省冶金地质勘查院", 0)');

        /*tx.executeSql('SELECT * FROM INFOS', [], function (tx, results) {
            var len = results.rows.length;
            db_len = len;
            for (var i = 0; i < len; i++) {
                var lo1, la1, lo2, la2;
                lo1 = results.rows.item(i).lon1;
                la1 = results.rows.item(i).lat1;
                lo2 = results.rows.item(i).lon2;
                la2 = results.rows.item(i).lat2;
                var polygon = new BMap.Polygon([
                    new BMap.Point(lo1, la1),
                    new BMap.Point(lo1, la2),
                    new BMap.Point(lo2, la2),
                    new BMap.Point(lo2, la1)
                ], {strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.3});
                polygon.disableMassClear();
                map.addOverlay(polygon);
            }
        }, null);*/
    })
}

//进行搜索数据库
function searchInfoByArea() {
    var origin_reflection_x = Math.abs(area_x2 - area_x1);
    var origin_reflection_y = Math.abs(area_y2 - area_y1);

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM INFOS', [], function (tx, results) {
            var len = results.rows.length;
            db_len = len;
            for (var i = 0; i < len; i++) {
                var lo1, la1, lo2, la2, temp_id;
                lo1 = results.rows.item(i).lon1;
                la1 = results.rows.item(i).lat1;
                lo2 = results.rows.item(i).lon2;
                la2 = results.rows.item(i).lat2;
                temp_id = results.rows.item(i).info_id;

                var target_reflection_x = Math.abs(lo1 - lo2);
                var target_reflection_y = Math.abs(la1 - la2);

                var distance_x = Math.abs(Math.max(lo1, lo2, area_x1, area_x2) - Math.min(lo1, lo2, area_x1, area_x2));
                var distance_y = Math.abs(Math.max(la1, la2, area_y1, area_y2) - Math.min(la1, la2, area_y1, area_y2));

                var x = origin_reflection_x + target_reflection_x - distance_x;
                var y = origin_reflection_y + target_reflection_y - distance_y;

                if (x > 0 && y > 0) {
                    var rate = (x * y) / (origin_reflection_x * origin_reflection_y);
                    rate = rate.toFixed(5);
                    tx.executeSql('UPDATE INFOS SET superposition = ? WHERE info_id = ?', [rate, temp_id]);
                }
            }

            tx.executeSql('SELECT * FROM INFOS WHERE superposition != 0', [], function (tx, results) {
                var len = results.rows.length;

                if (len == 0)
                    alert("该区域目前暂未包含已有项目的研究区域！");

                for (var i = 0; i < len; i++) {
                    if (results.rows.item(i).superposition != 0) {
                        r_array.push(results.rows.item(i).superposition);
                    }
                }

                r_array.sort();

                var count = 0;

                while (r_array.length > 0) {
                    var temp_index = r_array.pop();
                    (function (args1, args2) {
                        tx.executeSql('SELECT * FROM INFOS WHERE superposition = ?', [args1], function (tx, results) {
                            var lo1, la1, lo2, la2;
                            lo1 = results.rows.item(0).lon1;
                            la1 = results.rows.item(0).lat1;
                            lo2 = results.rows.item(0).lon2;
                            la2 = results.rows.item(0).lat2;
                            var polygon = new BMap.Polygon([
                                new BMap.Point(lo1, la1),
                                new BMap.Point(lo1, la2),
                                new BMap.Point(lo2, la2),
                                new BMap.Point(lo2, la1)
                            ], {strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.3});
                            map.addOverlay(polygon);

                            if (results.rows.length == 1) {
                                rlist[args2].innerHTML = ((args2 + 1) + ". <a href='detail_" + results.rows.item(0).info_id + ".html' target=\"_blank\">" + "《" + results.rows.item(0).article_name + "》</a><br>" +
                                    "<span style='font-size: 14px;color:palevioletred'> 出版单位：" + results.rows.item(0).article_author + "<br><span style='font-size: 14px'>重合率：" + results.rows.item(0).superposition * 100 + "%</span>");
                                tx.executeSql('UPDATE INFOS SET superposition = ? WHERE info_id = ?', [0, results.rows.item(0).info_id]);
                            } else {

                            }
                        }, null);
                    })(temp_index, count);
                    count++;
                }
            }, null);
        }, null);
    });
}

function setMapEvent() {
    map.disableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.disableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

function markLocationByLL() {
    var lon1 = document.getElementById("longtitude_1").value;
    var lat1 = document.getElementById("latitude_1").value;
    var lon2 = document.getElementById("longtitude_2").value;
    var lat2 = document.getElementById("latitude_2").value;
    area_x1 = lon1, area_y1 = lat1;
    area_x2 = lon2, area_y2 = lat2;

    if (lon1 != "" && lat1 != "" && lon2 != "" && lat2 != "") {
        var point1 = new BMap.Point(lon1, lat1);
        var point2 = new BMap.Point(lon2, lat2);
        var marker1 = new BMap.Marker(point1);
        var marker2 = new BMap.Marker(point2);

        map.centerAndZoom(point1, 11);

        map.addOverlay(marker1);
        map.addOverlay(marker2);

        var polygon = new BMap.Polygon([
            new BMap.Point(lon1, lat1),
            new BMap.Point(lon1, lat2),
            new BMap.Point(lon2, lat2),
            new BMap.Point(lon2, lat1)
        ], {strokeColor: "blue", strokeWeight: 2, strokeOpacity: 1});
        map.addOverlay(polygon);
    }

}

function findLocationByLL() {
    var lon = document.getElementById("longtitude").value;
    var lat = document.getElementById("latitude").value;

    if (lon != "" && lat != "") {
        var point = new BMap.Point(lon, lat);
        map.centerAndZoom(point, 13);
    }

}

function markPoint() {
    var lon = document.getElementById("longtitude").value;
    var lat = document.getElementById("latitude").value;

    if (lon != "" && lat != "") {
        var point = new BMap.Point(lon, lat);
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }
}

function create_region() {
    var allOverlay = map.getOverlays();
    var lu1 = allOverlay[db_len].point.lng;
    var la1 = allOverlay[db_len].point.lat;
    var lu2 = allOverlay[db_len + 1].point.lng;
    var la2 = allOverlay[db_len + 1].point.lat;

    area_x1 = lu1, area_y1 = la1;
    area_x2 = lu2, area_y2 = la2;

    var polygon = new BMap.Polygon([
        new BMap.Point(lu1, la1),
        new BMap.Point(lu1, la2),
        new BMap.Point(lu2, la2),
        new BMap.Point(lu2, la1)
    ], {strokeColor: "blue", strokeWeight: 2, strokeOpacity: 1});

    var removeMarker = function (e, ee, marker) {
        map.removeOverlay(marker);
    }

    var markerMenu = new BMap.ContextMenu();
    markerMenu.addItem(new BMap.MenuItem('删除该区域', removeMarker.bind(polygon)));

    polygon.addContextMenu(markerMenu);
    map.addOverlay(polygon);
}

function clear_region() {
    area_x1 = null, area_y1 = null;
    area_x2 = null, area_y2 = null;
    map.clearOverlays();
    db_len = 0;
    for (var i = 0; i < 5; i++) {
        rlist[i].innerHTML = "";
    }
}

function addMapControl() {
    //向地图中添加缩放控件
    var overViewOpen = new BMap.OverviewMapControl({isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});

    var ctrl_nav = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
    });
    map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1});
    map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
    map.addControl(overViewOpen);
}

initMap();

map.addEventListener("click", function (e) {
    var allOverlay = map.getOverlays();

    /*if (allOverlay.length > db_len + 1) {
        clear_region();
    }*/

    var removeMarker = function (e, ee, marker) {
        map.removeOverlay(marker);
    }

    var markerMenu = new BMap.ContextMenu();
    markerMenu.addItem(new BMap.MenuItem('删除该点', removeMarker.bind(marker)));

    var point = new BMap.Point(e.point.lng, e.point.lat);
    var label = new BMap.Label("经度" + e.point.lng + " 纬度：" + e.point.lat, {offset: new BMap.Size(20, -10)});
    var marker = new BMap.Marker(point);
    marker.setLabel(label);
    marker.addContextMenu(markerMenu);
    map.addOverlay(marker);
});
