
MetronicApp.factory('statisticsFactory', function($http, $q, API_URL) {
    return {
        getStatistics: function(operator,value,query) {
          //  country = country? country: 'ma';
            var deffered = $q.defer();

            $http.get(API_URL+'/stats', {params:{criteria:query,operators:operator,values:value}})
                .success(function(resp, status) {
                    deffered.resolve(resp);
                })
                .error(function(data, status) {
                    deffered.reject('Something is wrong with the api !');
                });
            return deffered.promise;
        },
        getStatisticsOnMap: function(operator,value,query) {
            //  country = country? country: 'ma';
            var deffered = $q.defer();

            $http.get(API_URL+'/statsOnMap', {params:{criteria:query,operators:operator,values:value}})
                .success(function(resp, status) {
                    deffered.resolve(resp);
                })
                .error(function(data, status) {
                    deffered.reject('Something is wrong with the api !');
                });
            return deffered.promise;
        },

        getStatisticsByDate: function(operator,value,first,second,freq,query) {
            //  country = country? country: 'ma';
            var deffered = $q.defer();

            $http.get(API_URL+'/statsByDate', {params:{criteria:query,operators:operator,values:value,firstdate:first,seconddate:second,frequency:freq}})
                .success(function(resp, status) {
                    deffered.resolve(resp);
                })
                .error(function(data, status) {
                    deffered.reject('Something is wrong with the api !');
                });
            return deffered.promise;
        }
    }
});
