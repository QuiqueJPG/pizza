
$(document).ready(function(){
	$(function () {
		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});
});

(function(){
	var app1 = angular.module('pizzasOn', [
		'ngRoute',
		'pizzasOn.controllers',
		'pizzasOn.directives',
		'PizzaService',
		'Constants',
		"ui.router",
		'ng-Shop'
		]);

	app1.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    	$stateProvider

		  .state('outside', {
    		url: '/outside',
    		abstract: false,
    		templateUrl: 'client/view/pizzas-online.ejs',
    		controller: 'PizzasController'
 			 })
		  .state('login', {
		    url: '/login',
		    templateUrl: 'client/view/login.ejs',
		    controller: 'LoginCtrl'
		  })
		  .state('profile', {
		    url: '/profile',
		    templateUrl: 'client/view/profile.ejs',
		    controller: 'ProfileController',
		    params: {
		        orders: null
		    }
		  })
		  .state('register', {
		    url: '/register',
		    templateUrl: 'client/view/register.ejs'
		  })
		  .state('inside', {
		    url: '/inside',
		    templateUrl: 'client/view/inside.ejs',
		    controller: 'InsideCtrl'
		  })
		  .state('404', {
		    url: '/404',
		    templateUrl: 'client/view/404.ejs'
		  })
		  .state('checkout', {
		    url: '/checkout',
		    templateUrl: 'client/view/checkout.ejs',
		    controller: 'cartController'
		  })
		  .state('contact-us', {
		    url: '/contact-us',
		    templateUrl: 'client/view/contact-us.ejs'
		  })
		  .state('product-details', {
		    url: '/product-details/{id}',
		    templateUrl: 'client/view/product-details.ejs',
		    controller: 'detailController',
		     })
		  .state('cart', {
    		url: '/cart',
    		templateUrl: 'client/view/cart.ejs',
    		controller: 'cartController'
 			 });
		 
		$urlRouterProvider.otherwise('/outside');
		
	}])


	app1.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
	  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
	    if (!AuthService.isAuthenticated()) {
	      console.log(next.name);
	      if (next.name !== 'login' && next.name !== 'register') {
	        event.preventDefault();
	        $state.go('login');
	      }
	    }
	  });
	});

	app1.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
    ])
	
})();

