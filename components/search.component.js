(function () {

    angular.module('app').component('search', {
        templateUrl: 'components/search.html',
        controller: SearchController
    });

    /* @ngInject */
    function SearchController($rootScope, $http, $state) {
        var $ctrl = this;

        $rootScope.searchTerm = $rootScope.searchTerm || 'Search';

        $ctrl.click = function () {
            $rootScope.searchTerm = '';
        }

        $ctrl.search = function () {
            var url = 'https://data.cityofchicago.org/resource/cwig-ma7x.json'
            var aka_name = encodeURIComponent($rootScope.searchTerm.toUpperCase().trim()) || '';

            if (aka_name.length === 0) {
                alert('Please enter a valid search term');
            } else {
                url = url + '?aka_name=' + aka_name;
                
                $http.get(url)
                    .then(success)
                    .catch(fail);

                function success(response) {
                    if (response.data && response.data.length > 0) {
                        $rootScope.list = response.data;
                        $state.go('list');
                    } else {
                        alert("No records found");
                    }
                }

                function fail(e) {
                    alert('Error calling API. Please try again.');
                }
            }
        };
    }
})();