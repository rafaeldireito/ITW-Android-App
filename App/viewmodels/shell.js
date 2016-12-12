define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title: 'Welcome', moduleId: 'viewmodels/welcome', nav: true, menu: '<span>  <i class="fa fa-home" style="font-size:20px"></i>&nbsp Home</span>' },
                { route: 'diretores', moduleId: 'viewmodels/diretores', nav: true, menu: '<span>  <i class="fa fa-user" style="font-size:20px"></i>&nbsp Directors</span>' },
                { route: 'atores', moduleId: 'viewmodels/atores', nav: true, menu: '<span>  <i class="fa fa-user" style="font-size:20px"></i>&nbsp Actors</span>' }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});
