/**
 * Created by ayoub on 10/08/15.
 */
MetronicApp.factory('authService', function($location,$localStorage,$http,$q, API_URL){
    return {
        //var deffered = $q.defer();
   /* $http.get(API_URL, {params: { q: city}})
        .success(function(resp, status) {
            deffered.resolve(resp);
        })
        .error(function(data, status) {
            deffered.reject('Something is wrong!');
        });
    return deffered.promise;*/

        signup: function (data) {
            var deffered = $q.defer();
            $http.post('http://localhost:5000/signup', data).success(function(resp,status){
                deffered.resolve(resp);
            })
                .error(function(data, status){
                    deffered.reject('Something is wrong!');
                });
            return deffered.promise;
        },
        signin: function (data) {
            var deffered= $q.defer();
            $http.post(API_URL+ '/signin', data).success(function(resp, status){
                 //$localStorage.token=resp.token;
                 //$localStorage.user=resp.user;
                deffered.resolve(resp);
            })
                .error(function(data, status){
                    deffered.reject('Something is wrong!');
                });
            return deffered.promise;
        },
        signout: function (success) {
            var deffered= $q.defer();
            //delete $localStorage.token;
            //delete $localStorage.user;
            success();
        }
    };
});
