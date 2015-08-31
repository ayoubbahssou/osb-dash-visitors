'use strict';

MetronicApp.controller('DashboardController', ['$rootScope','$scope','statisticsFactory','authService',function($rootScope, $scope,statisticsFactory,authService, $http, $timeout){
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        Metronic.initAjax();
    });
/****added by me***/
$scope.size;

    $scope.series = ['OS'];
    var data=[];
    $scope.pickedOs='empty';
    $scope.pickedBrowser='empty';
    $scope.pickedCpu='empty';
    $scope.pickedEngine='empty';
    $scope.first='05-01-2015';
    $scope.second='06-01-2015';
    $scope.frequency;
    $scope.number=[];
    $scope.numbers=[];
    $scope.data=[];
    $scope.tableData=[];
    $scope.ltableData=[];
    // $scope.data[0]=[];
    $scope.os=['empty','Ubuntu','iOS','Windows','Android', 'Mac OS X','arch','Linux','Windows Phone','BlackBerry','linux','SUSE'];
    $scope.browser=['empty','Firefox','Mobile Safari','Chrome','IE','Yandex','Opera','Baidu','Safari','WebKit','Maxthon','IEMobile','Chromium','Opera Mini'];
    $scope.cpu=['empty','amd64','ia32','ppc'];
    $scope.engine=['empty','Gecko','WebKit','Trident','Presto' ];
    // $scope.chartType="line";
    $scope.chartClass="chart-pie";
    $scope.searchCriteria="";
    $scope.showComplexSearch=false;
    $scope.labels=[];
    $scope.llabels=[];


    $scope.onClick = function (points) {
        //$scope.value=points[0].label;
        $scope.showComplexSearch=true;
        $scope.value=points[0].label;
        console.log( $scope.searchCriteria);
    };




   /// $scope.sm=true
    AmCharts.ready(function () {
        AmCharts.theme = AmCharts.themes.dark;
        $scope.map = new AmCharts.AmMap();

        $scope.min = Infinity;
        $scope.max = -Infinity;

        $scope.map.areasSettings = {
            unlistedAreasColor: "#000000",
            unlistedAreasAlpha: 0.1
        };
        $scope.map.imagesSettings.balloonText = "<span style='font-size:14px;'><b>[[title]]</b>: [[value]]</span>";

        var dataovider = {
            mapVar: AmCharts.maps.worldLow,
            images: []
        }




        $scope.map.dataProvider = dataovider;
        $scope.map.export = {
            enabled: true
        };
        //map.validateData();*/
        $scope.map.write("chartdiv");
    });




    $scope.ShowStatisticsOnMap=function(){
        $scope.showStats=true;
        $scope.query='geo.country';
        var values=['pre','caution'];
        var operators=['pre','caution'];
        if ($scope.pickedBrowser != 'empty') {
            operators.push('userAgent.browser.name');
            values.push($scope.pickedBrowser)
        }
        if ($scope.pickedOs != 'empty') {
            operators.push('userAgent.os.name');
            values.push($scope.pickedOs)
        }
        if ($scope.pickedCpu != 'empty') {
            operators.push('userAgent.cpu.architecture');
            values.push($scope.pickedCpu)
        }
        if ($scope.pickedEngine != 'empty') {
            operators.push('userAgent.engine.name');
            values.push($scope.pickedEngine)
        }

        //remove
        var index = operators.indexOf($scope.query);
        if (index > -1) {
            operators.splice(index, 1);
            values.splice(index, 1)
        }
        $scope.min = Infinity;
        $scope.max = -Infinity;
        statisticsFactory.getStatisticsOnMap(operators,values,'geo.country').then(function(stat) {
            $scope.map.addTitle("number of visitors by country", 14);
            $scope.map.areasSettings = {
                unlistedAreasColor: "#000000",
                unlistedAreasAlpha: 0.1
            };
            $scope.map.imagesSettings.balloonText = "<span style='font-size:14px;'><b>[[title]]</b>: [[value]]</span>";
            $scope.map.dataProvider.images = stat.mapData;
            $scope.map.validateData();
            $scope.map.validateData();
        })

    };

    /*******/

    $scope.getStatistics=function() {

        $scope.showStats=true;
        if ($scope.query == 'geo.country') $scope.showMap = true;
        var values = ['pre', 'caution'];
        var operators = ['pre', 'caution'];
        // console.log($scope.pickedOs);
        if ($scope.pickedBrowser != 'empty') {
            operators.push('userAgent.browser.name');
            values.push($scope.pickedBrowser)
        }
        if ($scope.pickedOs != 'empty') {
            operators.push('userAgent.os.name');
            values.push($scope.pickedOs)
        }
        if ($scope.pickedCpu != 'empty') {
            operators.push('userAgent.cpu.architecture');
            values.push($scope.pickedCpu)
        }
        if ($scope.pickedEngine != 'empty') {
            operators.push('userAgent.engine.name');
            values.push($scope.pickedEngine)
        }

        //remove
        var index = operators.indexOf($scope.query);
        if (index > -1) {
            operators.splice(index, 1);
            values.splice(index, 1)
        }

        statisticsFactory.getStatistics(operators, values, $scope.query).then(function (stat) {
            //  var stat={"systems":["Ubuntu","iOS","Windows","SUSE"],"stats":[{"Ubuntu":635},{"iOS":603},{"Windows":7868},{"SUSE":1}]};
            //$scope.number=stat.systems;
            $scope.labels = stat.systems;

            $scope.number=[];
            for(var i=0;i<stat.systems.length;i++){
                $scope.number[i]=i;
            }
            $scope.data[0]=stat.stats;

            console.log($scope.data)
            //$scope.series=stat.systems;


        })

    }
    /******/
    $scope.getStatisticsByDate=function() {
        $scope.showStats=true;
        if ($scope.query == 'geo.country') $scope.showMap = true;
        var values = ['pre', 'caution'];
        var operators = ['pre', 'caution'];
        // console.log($scope.pickedOs);
        if ($scope.pickedBrowser != 'empty') {
            operators.push('userAgent.browser.name');
            values.push($scope.pickedBrowser)
        }
        if ($scope.pickedOs != 'empty') {
            operators.push('userAgent.os.name');
            values.push($scope.pickedOs)
        }
        if ($scope.pickedCpu != 'empty') {
            operators.push('userAgent.cpu.architecture');
            values.push($scope.pickedCpu)
        }
        if ($scope.pickedEngine != 'empty') {
            operators.push('userAgent.engine.name');
            values.push($scope.pickedEngine)
        }
        console.log(operators);
        console.log(values);
        //remove
        var index = operators.indexOf($scope.query);
        if (index > -1) {
            operators.splice(index, 1);
            values.splice(index, 1);
        }

        statisticsFactory.getStatisticsByDate(operators, values,$scope.first,$scope.second,$scope.frequency, $scope.query).then(function (stat) {
            //  var stat={"systems":["Ubuntu","iOS","Windows","SUSE"],"stats":[{"Ubuntu":635},{"iOS":603},{"Windows":7868},{"SUSE":1}]};
            $scope.numbers=[];
            for(i=0;i<stat.series.length;i++){
                $scope.numbers[i]=i;
            }
            $scope.llabels = stat.labels;
            $scope.ldata=stat.data;
            $scope.lseries=stat.series;
            for(var i=0;i<stat.series.length;i++){
                $scope.ltableData[i]=0
                for(var j=0;j<$scope.llabels.length;j++){
                    $scope.ltableData[i]=$scope.ltableData[i]+stat.data[i][j];

                }

            }


        })

    }

  /*  $scope.signout=function(){
        authService.signout(function () {
            delete $rootScope.user;
            $scope.signinForm=false;
            $scope.signupForm=false
            $window.location.href='index.html'
        });
    };*/
/******/
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);