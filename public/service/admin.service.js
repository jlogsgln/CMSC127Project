//I will use camelCase here for functions 
'use strict';

(function(){
	angular
		.module('app')
		.factory('AdminService', AdminService);

	AdminService.$inject = ['$http', '$q'];

	const headers = {
	    'content-type': 'application/x-www-form-urlencoded'
	};

	function AdminService($http, $q) {
		
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

		const createAdminAccount = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'POST',
				params: data,
				url: '/todo/create_admin_account',
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

		const getAllEvents = function() {
            let deferred = $q.defer();
			
			$http({
				method: 'GET',
				url: '/todo/admin_getAllEvents',
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

		const getUsers = function() {
            let deferred = $q.defer();
			
			$http({
				method: 'GET',
				url: '/todo/admin_getUsers',
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

		const searchEvent = function(data) {
            let deferred = $q.defer();
			
			$http({
				method: 'GET',
				params: data,
				url: '/todo/admin_searchEvent',
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

		const editVenue = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'PUT',
				params: data,
				url: '/todo/admin_editVenue',
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

		const deleteVenue = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'DELETE',
				params: data,
				url: '/todo/admin_deleteVenue',
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

		const addVenue = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'POST',
				params: data,
				url: '/todo/admin_addVenue',
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

		const deleteUser = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'DELETE',
				params: data,
				url: '/todo/admin_deleteUser',
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

		const editUser = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'PUT',
				params: data,
				url: '/todo/admin_editUser',
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

		const editSelf = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'PUT',
				params: data,
				url: '/todo/admin_editSelf',
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
				url: '/todo/admin_pendingEvents',
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
				url: '/todo/admin_deletePendingEvent',
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

		const approveEvent = function(data){
			let deferred = $q.defer();

			console.log(data)
			$http({
				method: 'PUT',
				params: data,
				url: '/todo/admin_approveEvent',
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

		let service = {};
        service.getAllEvents = getAllEvents;
        service.getUsers = getUsers;
		service.signOut = signOut;
        service.createAdminAccount = createAdminAccount;
        service.getLogged = getLogged;
        service.getVenues = getVenues;
 		service.searchVenue = searchVenue;
 		service.editVenue = editVenue;
 		service.deleteVenue = deleteVenue;
 		service.addVenue = addVenue;
 		service.deleteUser = deleteUser;
        service.editUser = editUser;
        service.searchEvent	= searchEvent;
        service.editSelf = editSelf;
        service.pendingEvents = pendingEvents;
        service.deletePendingEvent = deletePendingEvent;
        service.approveEvent = approveEvent;

        return service;
	}
})();