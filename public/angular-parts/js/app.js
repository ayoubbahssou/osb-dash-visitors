/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    'ngStorage',
    'ngRoute',
    'angular-loading-bar',
    "chart.js"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.constant('API_URL', 'http://localhost:5000');
/*MetronicApp.config(['$ocLazyLoadProvider','$routeProvider', '$httpProvider', function($ocLazyLoadProvider,$routeProvider,$httpProvider) {
   /* $ocLazyLoadProvider.config({
        // global configs go here
    });*/
   /* $httpProvider.interceptors.push(['$location', '$localStorage','$routeProvider', '$httpProvider', function ($routeProvider,$httpProvider,$location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    //config.headers.Authorization ='Bearer' + $localStorage.token;
                    config.headers.Authorization =$localStorage.token;
                }
                return config;
            }
        };
    }]);
}]);*/
MetronicApp.config(['$routeProvider', '$httpProvider', function($routeProvider,$httpProvider) {


    //intercept every HTTP request and inject it with an Authorization header
    $httpProvider.interceptors.push(['$location', '$localStorage', function ($location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    //config.headers.Authorization ='Bearer' + $localStorage.token;
                    config.headers.Authorization =$localStorage.token;
                }
                return config;
            }
        };
    }]);
}]);

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        Metronic.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider

        // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/dashboard.html",            
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../vendor/assets/global/plugins/morris/morris.css',
                            '../vendor/assets/admin/pages/css/tasks.css',
                            
                            '../vendor/assets/global/plugins/morris/morris.min.js',
                            '../vendor/assets/global/plugins/morris/raphael-min.js',
                            '../vendor/assets/global/plugins/jquery.sparkline.min.js',

                            '../vendor/assets/admin/pages/scripts/index3.js',
                            '../vendor/assets/admin/pages/scripts/tasks.js',

                             '../angular-parts/js/controllers/DashboardController.js'

                        ] 
                    });
                }]
            }
        })
// Dashboard
        .state('dashboard2', {
            url: "/dashboard2.html",
            templateUrl: "views/dashboard2.html",
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../vendor/assets/global/plugins/morris/morris.css',
                            '../vendor/assets/admin/pages/css/tasks.css',

                            '../vendor/assets/global/plugins/morris/morris.min.js',
                            '../vendor/assets/global/plugins/morris/raphael-min.js',
                            '../vendor/assets/global/plugins/jquery.sparkline.min.js',

                            '../vendor/assets/admin/pages/scripts/index3.js',
                            '../vendor/assets/admin/pages/scripts/tasks.js',

                            '../angular-parts/js/controllers/DashboardController.js'

                        ]
                    });
                }]
            }
        })
        .state('dashboard3', {
            url: "/dashboard3.html",
            templateUrl: "views/dashboard3.html",
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../vendor/assets/global/plugins/morris/morris.css',
                            '../vendor/assets/admin/pages/css/tasks.css',

                            '../vendor/assets/global/plugins/morris/morris.min.js',
                            '../vendor/assets/global/plugins/morris/raphael-min.js',
                            '../vendor/assets/global/plugins/jquery.sparkline.min.js',

                            '../vendor/assets/admin/pages/scripts/index3.js',
                            '../vendor/assets/admin/pages/scripts/tasks.js',

                            '../angular-parts/js/controllers/DashboardController.js'

                        ]
                    });
                }]
            }
        })
        // AngularJS plugins



        .state('index', {
            url: "index.html",
            templateUrl: "/userTracker/public/angular-parts/index.html",
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "homeCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../vendor/assets/global/plugins/morris/morris.css',
                            '../vendor/assets/admin/pages/css/tasks.css',

                            '../vendor/assets/global/plugins/morris/morris.min.js',
                            '../vendor/assets/global/plugins/morris/raphael-min.js',
                            '../vendor/assets/global/plugins/jquery.sparkline.min.js',

                            '../vendor/assets/admin/pages/scripts/index3.js',
                            '../vendor/assets/admin/pages/scripts/tasks.js',

                            '../angular-parts/js/controllers/DashboardController.js'

                        ]
                    });
                }]
            }
        })
        /*.state('login', {
            url: "/login.html",
            templateUrl: "login.html",
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "homeCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../vendor/assets/global/plugins/morris/morris.css',
                            '../vendor/assets/admin/pages/css/tasks.css',

                            '../vendor/assets/global/plugins/morris/morris.min.js',
                            '../vendor/assets/global/plugins/morris/raphael-min.js',
                            '../vendor/assets/global/plugins/jquery.sparkline.min.js',

                            '../vendor/assets/admin/pages/scripts/index3.js',
                            '../vendor/assets/admin/pages/scripts/tasks.js',

                            '../angular-parts/js/controllers/homeCtrl.js'

                        ]
                    });
                }]
            }
        })*/

}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);