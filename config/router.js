'use strict';

var todo = require(__dirname + '/../controllers/todo');

module.exports = function(router){
	
	//For User
	router.post('/todo/sign_in', todo.sign_in);
	router.post('/todo/sign_out', todo.sign_out);
	router.post('/todo/create_account', todo.create_account);
	router.post('/todo/add_event', todo.add_event);


	router.get('/todo/user_getEvents', todo.get_all_events);
	router.get('/todo/user_pendingEvents', todo.pending_events);
	router.get('/todo/get_logged', todo.get_logged);
	router.get('/todo/user_searchEvent', todo.search_event);		
	router.get('/todo/user_getVenues', todo.get_all_venues);
	router.get('/todo/user_searchVenue', todo.search_venue);

	router.put('/todo/user_editEvent', todo.edit_event);

	router.delete('/todo/user_deleteEvent', todo.delete_event);
	router.delete('/todo/user_deletePendingEvent', todo.delete_pending_event);

	//For Admin
	router.get('/todo/admin_getAllEvents', todo.aget_all_events);
	router.get('/todo/admin_getUsers', todo.get_all_users);	
	router.get('/todo/admin_searchEvent', todo.asearch_event);
	router.get('/todo/admin_pendingEvents', todo.apending_events);

	router.post('/todo/create_admin_account', todo.create_admin_account);
	router.post('/todo/admin_addVenue', todo.add_venue);
	
	router.put('/todo/admin_editVenue', todo.edit_venue);
	router.put('/todo/admin_editUser', todo.edit_user);
	router.put('/todo/admin_editSelf', todo.edit_self);
	router.put('/todo/admin_approveEvent', todo.approve_event);

	router.delete('/todo/admin_deleteVenue', todo.delete_venue);
	router.delete('/todo/admin_deleteUser', todo.delete_user);
	router.delete('/todo/admin_deletePendingEvent', todo.adelete_pending_event);
	
	

	return router;
};