(function () {
    var app = angular.module('app', [
        'ngRoute',
        'ui.router'
    ])

    app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('search', {
                url: "/search",
                template: "<search></search>"
            })
            .state('detailed', {
                url: "/detailed",
                template: "<detailed></detailed>"
            })
            .state('list', {
                url: "/list",
                template: "<list></list>"
            });

        $urlRouterProvider.otherwise("/search");
    })
})();