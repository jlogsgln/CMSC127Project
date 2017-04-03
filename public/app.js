'use strict';

(function(){
	angular
		.module('app', ['ngRoute'])
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider){
		$routeProvider
			.when('/sign_in', {
				'controller' : 'UserCtrl',
				'templateUrl': 'view/sign_in.view.html'
			})
			.when('/create_account', {
				'controller' : 'UserCtrl',
				'templateUrl': 'view/create_account.view.html'
			})
			.when('/user',{
				'controller': 'UserCtrl',
				'templateUrl': 'view/user_main.view.html'
			})
			.when('/user_add_event',{
				'controller': 'UserCtrl',
				'templateUrl': 'view/user_add_event.view.html'
			})
			.when('/user_search_venue',{
				'controller': 'UserCtrl',
				'templateUrl': 'view/user_search_venue.view.html'
			})
			.when('/user_pending_events',{
				'controller': 'UserCtrl',
				'templateUrl': 'view/user_pending_events.view.html'
			})
			.when('/admin', {
				'controller' : 'AdminCtrl',
				'templateUrl': 'view/admin_main.view.html'
			})
			.when('/admin_users', {
				'controller' : 'AdminCtrl',
				'templateUrl': 'view/admin_users.view.html'
			})
			.when('/admin_add_venue',{
				'controller': 'AdminCtrl',
				'templateUrl': 'view/admin_add_venue.view.html'
			})
			.when('/admin_venues',{
				'controller': 'AdminCtrl',
				'templateUrl': 'view/admin_venues.view.html'
			})
			.when('/admin_pending_event',{
				'controller': 'AdminCtrl',
				'templateUrl': 'view/admin_pending_event.view.html'
			})
			.otherwise({'redirectTo': 'sign_in'});
	}
})();