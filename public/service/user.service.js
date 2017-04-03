//I will use camelCase here for functions 

'use strict';

(function(){
	angular
		.module('app')
		.factory('UserService', UserService);

	UserService.$inject = ['$http', '$q'];

	const headers = {
	    'content-type': 'application/x-www-form-urlencoded'
	};

	function UserService($http, $q) {
		const signIn = function(data){
			let deferred = $q.defer();

			console.log("Serv:" + data.email + "," + data.password);
			$http({
				method: 'POST',
				params: data,
				url: '/todo/sign_in',
				headers: headers
			})
			.then((res) => {
					console.log(res);
					deferred.resolve(res.data);
				}, (err) => {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		const createAccount = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'POST',
				params: data,
				url: '/todo/create_account',
				headers: headers
			})
			.then((res) => {
					console.log(res.data);
					deferred.resolve(res.data);
				}, (err) => {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		const signOut = function(){
			let deferred = $q.defer();

			$http({
				method: 'POST',
				url: '/todo/sign_out',
				headers: headers
			})
			.then((res) => {
				deferred.resolve(res.data);
			}, (err) => {
				deferred.reject(err);
			});

			return deferred.promise;
		}

		const getEvents = function() {
            let deferred = $q.defer();
			
			$http({
				method: 'GET',
				url: '/todo/user_getEvents',
				headers: headers
			})
			.then((res) => {
					console.log(res);
					deferred.resolve(res);
				}, (err) => {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		const addEvent = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'POST',
				params: data,
				url: '/todo/add_event',
				headers: headers
			})
			.then((res) => {
					console.log(res.data);
					deferred.resolve(res.data);
				}, (err) => {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		const getLogged = function(){
			let deferred = $q.defer();

			$http({
				method: 'GET',
				url: '/todo/get_logged',
				headers: headers
			})
			.then((res) => {
				deferred.resolve(res.data);
			}, (err) => {
				deferred.reject(err);
			});

			return deferred.promise;
		}

		const searchEvent = function(data) {
            let deferred = $q.defer();
			
			$http({
				method: 'GET',
				params: data,
				url: '/todo/user_searchEvent',
				headers: headers
			})
			.then((res) => {
					console.log(res);
					deferred.resolve(res);
				}, (err) => {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		const editEvent = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'PUT',
				params: data,
				url: '/todo/user_editEvent',
				headers: headers
			})
			.then((res) => {
					console.log(res.data);
					deferred.resolve(res.data);
				}, (err) => {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		const getVenues = function() {
            let deferred = $q.defer();
			
			$http({
				method: 'GET',
				url: '/todo/user_getVenues',
				headers: headers
			})
			.then((res) => {
					console.log(res);
					deferred.resolve(res);
				}, (err) => {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		const searchVenue = function(data) {
            let deferred = $q.defer();
			
			$http({
				method: 'GET',
				params: data,
				url: '/todo/user_searchVenue',
				headers: headers
			})
			.then((res) => {
					console.log(res);
					deferred.resolve(res);
				}, (err) => {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		const deleteEvent = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'DELETE',
				params: data,
				url: '/todo/user_deleteEvent',
				headers: headers
			})
			.then((res) => {
					console.log(res.data);
					deferred.resolve(res.data);
				}, (err) => {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		const pendingEvents = function() {
            let deferred = $q.defer();
			
			$http({
				method: 'GET',
				url: '/todo/user_pendingEvents',
				headers: headers
			})
			.then((res) => {
					console.log(res);
					deferred.resolve(res);
				}, (err) => {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		const deletePendingEvent = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'DELETE',
				params: data,
				url: '/todo/user_deletePendingEvent',
				headers: headers
			})
			.then((res) => {
					console.log(res.data);
					deferred.resolve(res.data);
				}, (err) => {
					deferred.reject(err);
				});

			return deferred.promise;
		}

		// const editSelf = function(data){
		// 	let deferred = $q.defer();

		// 	console.log(data)
		// 	$http({
		// 		method: 'PUT',
		// 		params: data,
		// 		url: '/todo/admin_editSelf',
		// 		headers: headers
		// 	})
		// 	.then((res) => {
		// 			console.log(res.data);
		// 			deferred.resolve(res.data);
		// 		}, (err) => {
		// 			deferred.reject(err);
		// 		});

		// 	return deferred.promise;
		// }


		let service = {};
        service.signIn = signIn;
        service.signOut = signOut;
        service.createAccount = createAccount;
        service.getLogged = getLogged;
        service.getEvents = getEvents;
        service.addEvent = addEvent;
        service.deleteEvent = deleteEvent;
        service.searchEvent = searchEvent;
 		service.editEvent = editEvent;
 		service.getVenues = getVenues;
 		service.searchVenue = searchVenue;       
        service.pendingEvents = pendingEvents;
        service.deletePendingEvent = deletePendingEvent;
        // service.editSelf = editSelf;

        return service;
	}
})();
