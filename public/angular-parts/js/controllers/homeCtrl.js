MetronicApp.controller('homeCtrl',['$rootScope', '$scope', '$location', '$localStorage', 'authService','$window',
    function ($rootScope, $scope, $location, $localStorage, authService,$window) {
      /*  function successAuth(res) {
            $localStorage.token = res.token;
            window.location = "/";
        }
        function failAuth(res) {
           //check if there's a message
            $rootScope.error = res.message;
        }
*/
//$localStorage.token={};
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();
        });

        $rootScope.user=$localStorage.user;

        $scope.signin=function(){
            var form={
                username:$scope.login,
                password:$scope.password
            };
            authService.signin(form).then(function(result){
                $localStorage.token =result.token;
                /*console.log('token')
                console.log(result.token)
                console.log($localStorage.token)*/
                $localStorage.user=result.user;
                $rootScope.user= result.user;
                $window.location.href='index.html'
            },function(error){
                alert(error);
            });

        };
      /*  $scope.signup=function(){
            var form={
                username:$scope.login,
                password:$scope.password,
                pseudo:$scope.pseudo
            };
            authService.signup(form).then(function(result){
                $localStorage.token = result.token;
                $localStorage.user=result.user;
                $rootscope.user= result.user;

            },function(error){
                alert(error);
            });
        };*/
        $scope.signout=function(){
            authService.signout(function () {
                delete $rootScope.user;
                delete $localStorage.token;
                delete  $localStorage.user;
                $scope.signinForm=false;
                $scope.signupForm=false
                $window.location.href='login.html'
            });
        };
        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;
    }]);
