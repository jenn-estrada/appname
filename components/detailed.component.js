(function () {

    angular.module('app').component('detailed', {
        templateUrl: 'components/detailed.html',
        controller: DetailedController
    });

    /* @ngInject */
    function DetailedController($rootScope, $state) {
        var $ctrl = this;

        if (!$rootScope.showDetailed) {
            $state.go('search');
        }

        $ctrl.item = $rootScope.showDetailed;

        $ctrl.goBack = function () {
            if (!$rootScope.list || $rootScope.list.length === 0) {
                $state.go('search');
            } else {
                $state.go('list');
            }
        };
    }

})();