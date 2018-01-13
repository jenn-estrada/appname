(function () {

    angular.module('app').component('list', {
        templateUrl: 'components/list.html',
        controller: ListController
    });

    /* @ngInject */
    function ListController($rootScope, $state) {
        const PAGESIZE = 5;
        var $ctrl = this;

        if (!$rootScope.list || $rootScope.list.length === 0) {
            $state.go('search');
        }

        $ctrl.$onInit = onInit();

        $ctrl.incPage = function () {
            if ($ctrl.currentPage < $ctrl.pageCount) {
                $ctrl.currentPage++;
            }
            $ctrl.list = $ctrl.pages[$ctrl.currentPage];
        };

        $ctrl.decPage = function () {
            if ($ctrl.currentPage > 0) {
                $ctrl.currentPage--;
            }
            $ctrl.list = $ctrl.pages[$ctrl.currentPage];
        };

        $ctrl.backToSearch = function () {
            $state.go('search');
        };

        $ctrl.openDetailed = function (item) {
            $rootScope.showDetailed = item;
            $state.go('detailed');
        };

        function getPages(list) {
            if (!list) return [];

            var pages = [];
            $ctrl.pageCount = Math.ceil(list.length / PAGESIZE);

            for(var i = 0; i < $ctrl.pageCount; i++) {
                pages.push(list.slice((i * PAGESIZE), ((i + 1 ) * PAGESIZE)));
            }

            return pages;
        }

        function onInit() {
            $ctrl.pages = getPages($rootScope.list);

            $ctrl.currentPage = 0;

            $ctrl.list = $ctrl.pages[$ctrl.currentPage];
        }
    }

})();