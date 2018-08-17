// 탭 메뉴
function openCity(evt, cityName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("sm-tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("sm-tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(
				" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}

//체중 function
var weightInfo = new Array();
$.get(serverRoot + "/json/bodyInfo/list/" + userInfo.userNo, function(data) {
	for (var i = 0; i < data.length; i++) {
		weightInfo.push({
			"date" : data[i].bdate,
			"value" : data[i].weight
		})
	}
	console.log(weightInfo)
});

//체지방 function
var fatInfo = new Array();
	$.get(serverRoot + "/json/bodyInfo/list/" + userInfo.userNo, function(data) {
		for (var i = 0; i < data.length; i++) {
			fatInfo.push({
				"date" : data[i].bdate,
				"value" : data[i].fat
			})
		}
		console.log(fatInfo)
});			

//근력량 function
var muscleInfo = new Array();
	$.get(serverRoot + "/json/bodyInfo/list/" + userInfo.userNo, function(data) {
		for (var i = 0; i < data.length; i++) {
			muscleInfo.push({
				"date" : data[i].bdate,
				"value" : data[i].weight
			})
		}
		console.log(muscleInfo)
	})

// InfoId => fatInfo, weightInfo, muscleInfo
var chart1 = AmCharts.makeChart("chartdiv1", { // div Id
		"type": "serial",
		"theme": "light",
		"language": "ko",
		"marginRight": 30,
		"marginLeft": 30,
		"autoMarginOffset": 20,
		"mouseWheelZoomEnabled":true,
		"dataDateFormat": "YYYY-MM-DD",
		"valueAxes": [{
			"id": "v1",
			"axisAlpha": 0,
			"position": "left",
			"ignoreAxisWidth":true
		}],
		"balloon": {
			"borderThickness": 1,
			"shadowAlpha": 0
		},
		"graphs": [{
			"id": "g1",
			"balloon":{
				"drop":true,
				"adjustBorderColor":false,
				"color":"#ffffff"
			},
			"bullet": "round",
			"bulletBorderAlpha": 1,
			"bulletColor": "#FFFFFF",
			"bulletSize": 5,
			"hideBulletsCount": 50,
			"lineThickness": 2,
			"title": "red line",
			"useLineColorForBulletBorder": true,
			"valueField": "value",
			"balloonText": "<span style='font-size:18px;'>[[value]]</span>"
		}],
		"chartScrollbar": {
			"graph": "g1",
			"oppositeAxis":false,
			"offset":30,
			"scrollbarHeight": 80,
			"backgroundAlpha": 0,
			"selectedBackgroundAlpha": 0.1,
			"selectedBackgroundColor": "#888888",
			"graphFillAlpha": 0,
			"graphLineAlpha": 0.5,
			"selectedGraphFillAlpha": 0,
			"selectedGraphLineAlpha": 1,
			"autoGridCount":true,
			"color":"#AAAAAA"
		},
		"chartCursor": {
			"pan": true,
			"valueLineEnabled": true,
			"valueLineBalloonEnabled": true,
			"cursorAlpha":1,
			"cursorColor":"#258cbb",
			"limitToGraph":"g1",
			"valueLineAlpha":0.2,
			"valueZoomable":true
		},
		"valueScrollbar":{
			"oppositeAxis":false,
			"offset":50,
			"scrollbarHeight":10
		},
		"categoryField": "date",
		"categoryAxis": {
			"parseDates": true,
			"dashLength": 1,
			"minorGridEnabled": true
		},
		"export": {
			"enabled": true
		},
		"dataProvider": weightInfo // list 불러와서 붙일 부분
	});

	chart1.addListener("rendered", zoomChart1);

	zoomChart1();

function zoomChart1() {
	chart1.zoomToIndexes(chart1.dataProvider.length - 40, chart1.dataProvider.length - 1);
}

var chart2 = AmCharts.makeChart("chartdiv2", { // div Id
	"type": "serial",
	"theme": "light",
	"language": "ko",
	"marginRight": 30,
	"marginLeft": 30,
	"autoMarginOffset": 20,
	"mouseWheelZoomEnabled":true,
	"dataDateFormat": "YYYY-MM-DD",
	"valueAxes": [{
		"id": "v1",
		"axisAlpha": 0,
		"position": "left",
		"ignoreAxisWidth":true
	}],
	"balloon": {
		"borderThickness": 1,
		"shadowAlpha": 0
	},
	"graphs": [{
		"id": "g1",
		"balloon":{
			"drop":true,
			"adjustBorderColor":false,
			"color":"#ffffff"
		},
		"bullet": "round",
		"bulletBorderAlpha": 1,
		"bulletColor": "#FFFFFF",
		"bulletSize": 5,
		"hideBulletsCount": 50,
		"lineThickness": 2,
		"title": "red line",
		"useLineColorForBulletBorder": true,
		"valueField": "value",
		"balloonText": "<span style='font-size:18px;'>[[value]]</span>"
	}],
	"chartScrollbar": {
		"graph": "g1",
		"oppositeAxis":false,
		"offset":30,
		"scrollbarHeight": 80,
		"backgroundAlpha": 0,
		"selectedBackgroundAlpha": 0.1,
		"selectedBackgroundColor": "#888888",
		"graphFillAlpha": 0,
		"graphLineAlpha": 0.5,
		"selectedGraphFillAlpha": 0,
		"selectedGraphLineAlpha": 1,
		"autoGridCount":true,
		"color":"#AAAAAA"
	},
	"chartCursor": {
		"pan": true,
		"valueLineEnabled": true,
		"valueLineBalloonEnabled": true,
		"cursorAlpha":1,
		"cursorColor":"#258cbb",
		"limitToGraph":"g1",
		"valueLineAlpha":0.2,
		"valueZoomable":true
	},
	"valueScrollbar":{
		"oppositeAxis":false,
		"offset":50,
		"scrollbarHeight":10
	},
	"categoryField": "date",
	"categoryAxis": {
		"parseDates": true,
		"dashLength": 1,
		"minorGridEnabled": true
	},
	"export": {
		"enabled": true
	},
	"dataProvider": fatInfo // list 불러와서 붙일 부분
});

chart2.addListener("rendered", zoomChart2);

zoomChart2();

function zoomChart2() {
chart2.zoomToIndexes(chart2.dataProvider.length - 40, chart2.dataProvider.length - 1);
}

var chart3 = AmCharts.makeChart("chartdiv3", { // div Id
	"type": "serial",
	"theme": "light",
	"language": "ko",
	"marginRight": 30,
	"marginLeft": 30,
	"autoMarginOffset": 20,
	"mouseWheelZoomEnabled":true,
	"dataDateFormat": "YYYY-MM-DD",
	"valueAxes": [{
		"id": "v1",
		"axisAlpha": 0,
		"position": "left",
		"ignoreAxisWidth":true
	}],
	"balloon": {
		"borderThickness": 1,
		"shadowAlpha": 0
	},
	"graphs": [{
		"id": "g1",
		"balloon":{
			"drop":true,
			"adjustBorderColor":false,
			"color":"#ffffff"
		},
		"bullet": "round",
		"bulletBorderAlpha": 1,
		"bulletColor": "#FFFFFF",
		"bulletSize": 5,
		"hideBulletsCount": 50,
		"lineThickness": 2,
		"title": "red line",
		"useLineColorForBulletBorder": true,
		"valueField": "value",
		"balloonText": "<span style='font-size:18px;'>[[value]]</span>"
	}],
	"chartScrollbar": {
		"graph": "g1",
		"oppositeAxis":false,
		"offset":30,
		"scrollbarHeight": 80,
		"backgroundAlpha": 0,
		"selectedBackgroundAlpha": 0.1,
		"selectedBackgroundColor": "#888888",
		"graphFillAlpha": 0,
		"graphLineAlpha": 0.5,
		"selectedGraphFillAlpha": 0,
		"selectedGraphLineAlpha": 1,
		"autoGridCount":true,
		"color":"#AAAAAA"
	},
	"chartCursor": {
		"pan": true,
		"valueLineEnabled": true,
		"valueLineBalloonEnabled": true,
		"cursorAlpha":1,
		"cursorColor":"#258cbb",
		"limitToGraph":"g1",
		"valueLineAlpha":0.2,
		"valueZoomable":true
	},
	"valueScrollbar":{
		"oppositeAxis":false,
		"offset":50,
		"scrollbarHeight":10
	},
	"categoryField": "date",
	"categoryAxis": {
		"parseDates": true,
		"dashLength": 1,
		"minorGridEnabled": true
	},
	"export": {
		"enabled": true
	},
	"dataProvider": muscleInfo // list 불러와서 붙일 부분
});

chart3.addListener("rendered", zoomChart3);

zoomChart3();

function zoomChart3() {
chart3.zoomToIndexes(chart3.dataProvider.length - 40, chart3.dataProvider.length - 1);
}
