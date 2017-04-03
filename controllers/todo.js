'use strict';

var db = require(__dirname + '/../lib/mysql');

exports.sign_in = function(req, res, next){
	
	console.log("Todo: " + req.query.email + ", " + req.query.password);

	var query_string = 'SELECT * FROM user WHERE username=? && pass=?';
	var request_data = [req.query.email, req.query.password];

	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}else{
			if(result.length != 0){
				console.log("Successfully logged-in");
				req.session.user = {
					acct_id: result[0].acct_id,
					fname: result[0].fname,
					mname: result[0].mname,
					lname: result[0].lname,
					username: result[0].username,
					password: result[0].pass,
					type: result[0].type,
					eadd: result[0].eadd,
					contno: result[0].contno,
					bday: result[0].bday,
					occ: result[0].occ
				};
				req.session.save();
				return res.send(req.session.user);
			}
			else{
				return res.send({value: 0, message: 'User name and password do not match!'});
			}
		}
	});
};

exports.sign_out = function(req, res, next){
	req.session.destroy(function(err) {
		if(err) {
	    	console.log(err);
	  	}else {
	  		return res.send({message: 'Account logged out successfully!'});
	  	}
	});
};

exports.create_account = function(req, res, next){
	
	console.log(req.query.username);
	console.log(req.query.password);
	
	var query_string = 'INSERT INTO user(username,pass,fname,mname,lname,bday,eadd,occ,contno, type) values(?,?,?,?,?,?,?,?,?,?)';
	var request_data = [req.query.username, req.query.password, req.query.fname, req.query.mname, req.query.lname, 
						req.query.bday, req.query.email, req.query.occ, req.query.contactNum, req.query.type];

	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
		}else{
			db.query('SELECT acct_id FROM user WHERE username=?', req.query.username, function(err, result){
				if(err){
					console.log('2nd:')
					console.log(err);
					return res.status(500).send(err);
				}else{
					console.log(result[0].acct_id)

					db.query('INSERT INTO reguser(acct_id) values(?)', result[0].acct_id, function(err, result){
						if(err){
							console.log('3rd:')
							return res.status(500).send(err);
						}else{
							return res.send({message: 'Account created successfully!'});
						}
					});
				}	
			});
		}
	});
};

exports.add_event = function(req, res, next){
	db.query('SELECT * FROM event e, venue v, eventvenue ev WHERE ev.eventno=e.eventno && ev.venue_no = v.venue_no && edate=? && etime=?', [req.query.edate, req.query.etime], function(err, result){
		if (result.length == 0){
			var query_venue = 'SELECT * FROM venue WHERE vname=?';
			var request_venue = [req.query.vname];
			
			console.log(req.query.vname);
			
			db.query(query_venue, request_venue, function(err, result){
				if(err) console.log(err);
				else{
					console.log('Venue' + result);
					if(result != 0){
						var venue = result[0].venue_no;
						var query_string = 'INSERT INTO event(ename, edate, etime, eduration, epurpose, eattendees, status) values(?,?,?,?,?,?,?)';
						var request_data = [req.query.ename, req.query.edate, req.query.etime, req.query.eduration, req.query.epurpose, req.query.eattendees,'pending'];

						console.log(req.query);
						db.query(query_string, request_data, function(err, result){
							if(err){
								console.log('2nd:')
								console.log(err);
								return res.status(500).send(err);
							}else{
								var query_eventno = 'SELECT * FROM event WHERE ename=?'
								db.query(query_eventno, req.query.ename, function(err, result){
									if(err){
										console.log('3rd:')
										console.log(err);
										return res.status(500).send(err);
									}else{
										var event = result[0].eventno;
										var query_ev = 'INSERT INTO eventvenue(acct_id, eventno, venue_no) values(?, ?,?)';
										var request_ev = [req.session.user.acct_id, event, venue];

										db.query(query_ev, request_ev, function(err, result){
											if(err){
												console.log('3rd:')
												console.log(err);
												return res.status(500).send(err);
											}else return res.send({message: 'Event created successfully for approval!'});
										});
									}
								});
							}
						});	
					}
					else{
						return res.send({message: 'Venue does not exist!'});
					}
				}
			});
		}else return res.send({message: 'Date and time already occupied! Please try again.'});
	});
};


exports.get_all_events = function(req, res, next){
	var query_string = 'SELECT * FROM event e, venue v, eventvenue ev, user u WHERE ev.eventno=e.eventno && ev.venue_no = v.venue_no && ev.acct_id = u.acct_id && u.acct_id = ? && e.status=? ORDER BY edate DESC';
	var request_data = [req.session.user.acct_id, 'approved'];

	db.query(query_string, request_data, function(err, result){
		// console.log(result);
		return res.send(result);

	});
};

exports.get_all_users = function(req, res, next){
	var query_string = 'SELECT * FROM user WHERE acct_id !=?';

	db.query(query_string, req.session.user.acct_id, function(err, result){
		return res.send(result);

	});
};

exports.get_logged = function(req, res, next){
	return res.send(req.session.user);
};

exports.search_event = function(req, res, next){
	var query_string = 'SELECT * FROM event WHERE ename LIKE ? && status=?';
	var request_data = ['%' + req.query.search + '%', 'approved'];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if(result.length != 0) return res.send(result);
		else{
			var query_string = 'SELECT * FROM event e, venue v, eventvenue ev, user u WHERE ev.eventno=e.eventno && ev.venue_no = v.venue_no && ev.acct_id = u.acct_id && u.acct_id = ? && e.status=? ORDER BY edate DESC';
			var request_data = [req.session.user.acct_id, 'approved'];

			db.query(query_string, request_data, function(err, result){
				// console.log(result);
				return res.send(result);

			});
		}
	});
};

exports.asearch_event = function(req, res, next){
	var query_string = 'SELECT * FROM event e, venue v, eventvenue ev, user u WHERE ev.eventno=e.eventno && ev.venue_no = v.venue_no && ev.acct_id = u.acct_id && status=? && ename LIKE ?';
	var request_data = ['approved', '%' + req.query.search + '%'];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		console.log(result);
		if(result != 0) return res.send(result);
		else{
			var query_string = 'SELECT * FROM event e, venue v, eventvenue ev, user u WHERE ev.eventno=e.eventno && ev.venue_no = v.venue_no && ev.acct_id = u.acct_id ORDER BY edate DESC';
			var request_data = [req.session.user.acct_id];

			db.query(query_string, request_data, function(err, result){
				// console.log(result);
				return res.send(result);

			});
		}
	});
};

exports.edit_event = function(req, res, next){
		
	var query_string = 'UPDATE event SET ename=?, edate=?, etime=?, eduration=?, epurpose=?, eattendees=? WHERE eventno=?';
	var request_data = [req.query.ename, req.query.edate, req.query.etime, req.query.eduration, req.query.epurpose, req.query.eattendees, req.query.eventno];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log('2nd:')
			console.log(err);
			return res.status(500).send(err);
		}else{
			return res.send({message: 'Event edited successfully!'});
		}
	});
};



exports.create_admin_account = function(req, res, next){
	
	console.log(req.query.username);
	console.log(req.query.password);
	
	var query_string = 'INSERT INTO user(username,pass,fname,mname,lname,bday,eadd,occ,contno,type) values(?,?,?,?,?,?,?,?,?,?)';
	var request_data = [req.query.username, req.query.password, req.query.fname, req.query.mname, req.query.lname, 
						req.query.bday, req.query.email, req.query.occ, req.query.contactNum, req.query.type];

	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
		}else{
			db.query('SELECT acct_id FROM user WHERE username=?', req.query.username, function(err, result){
				if(err){
					console.log('2nd:')
					console.log(err);
					return res.status(500).send(err);
				}else{
					if(req.query.type == 'admin'){
						console.log(result[0].acct_id)

						db.query('INSERT INTO admin(admin_acctid) values(?)', result[0].acct_id, function(err, result){
							if(err){
								console.log('3rd:')
								return res.status(500).send(err);
							}else{
								return res.send({message: 'Admin account created successfully!'});
							}
						});
					}
					else{
						console.log(result[0].acct_id)

						db.query('INSERT INTO reguser(acct_id) values(?)', result[0].acct_id, function(err, result){
							if(err){
								console.log('3rd:')
								return res.status(500).send(err);
							}else{
								return res.send({message: 'User account created successfully!'});
							}
						});
					}
				}	
			});
		}
	});
};


exports.get_all_venues = function(req, res, next){
	var query_string = 'SELECT * FROM venue';

	db.query(query_string, [], function(err, result){
		// console.log(result);
		return res.send(result);

	});
};

exports.search_venue = function(req, res, next){
	var query_string = 'SELECT * FROM venue WHERE vname LIKE ?';
	var request_data = ['%' + req.query.search + '%'];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if (result.length != 0) return res.send(result);
		else{
			var query_string = 'SELECT * FROM venue';

			db.query(query_string, [], function(err, result){
				// console.log(result);
				return res.send(result);

			});			
		}
	});
};

exports.aget_all_events = function(req, res, next){
	var query_string = 'SELECT * FROM event e, venue v, eventvenue ev, user u WHERE ev.eventno=e.eventno && ev.venue_no = v.venue_no && ev.acct_id = u.acct_id ORDER BY edate DESC';

	db.query(query_string, [], function(err, result){
		// console.log(result);
		return res.send(result);

	});
};

exports.edit_venue = function(req, res, next){
		
	var query_string = 'UPDATE venue SET vname=?, vcapacity=?, vprice=?, vaddress=? WHERE venue_no=?';
	var request_data = [req.query.vname, req.query.capacity, req.query.price, req.query.address, req.query.venueno];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log('2nd:')
			console.log(err);
			return res.status(500).send(err);
		}else{
			return res.send({message: 'Venue edited successfully!'});
		}
	});
};

exports.delete_venue = function(req, res, next){
		
	var query_string = 'DELETE FROM venue WHERE venue_no=?';
	var request_data = [req.query.venueno];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log('2nd:')
			console.log(err);
			return res.status(500).send(err);
		}else{
			return res.send({message: 'Venue deleted successfully!'});
		}
	});
};

exports.add_venue = function(req, res, next){
		
	var query_string = 'INSERT INTO venue(vname,vcapacity,vprice,vaddress) VALUES(?,?,?,?)';
	var request_data = [req.query.vname, req.query.capacity, req.query.price, req.query.address];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log('2nd:')
			console.log(err);
			return res.status(500).send(err);
		}else{
			console.log(result)
			return res.send({message: 'Venue added successfully!'});
		}
	});
};

exports.delete_user = function(req, res, next){
		
	var query_string = 'DELETE FROM user WHERE acct_id=?';
	var request_data = [req.query.acct_id];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}else{
			if(req.query.type == 'admin'){
				db.query('DELETE FROM admin WHERE admin_acctid=?', request_data, function(err, result){
					if(err){
						console.log(err);
						return res.status(500).send(err);
					}
					else{
						return res.send({message: 'User deleted successfully!'});
					}
				});
			}
			else{
				db.query('DELETE FROM reguser WHERE acct_id=?', request_data, function(err, result){
					if(err){
						console.log(err);
						return res.status(500).send(err);
					}
					else{
						return res.send({message: 'User deleted successfully!'});
					}
				});	
			}
		}
	});
};

exports.edit_user = function(req, res, next){
		
	var query_string = 'UPDATE user SET fname=?,mname=?,lname=?,bday=?,occ=?,eadd=?,contno=?,pass=? WHERE acct_id=?';
	var request_data = [req.query.fname, req.query.mname, req.query.lname, req.query.bday, req.query.occ, req.query.email, req.query.contactNum, req.query.password, req.query.acct_id];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}else{
			return res.send({message: 'User edited successfully!'});
		}
	});
};

exports.edit_self = function(req, res, next){
		
	var query_string = 'UPDATE user SET fname=?,mname=?,lname=?,bday=?,occ=?,eadd=?,contno=?,pass=? WHERE acct_id=?';
	var request_data = [req.query.fname, req.query.mname, req.query.lname, req.query.bday, req.query.occ, req.query.email, req.query.contactNum, req.query.password, req.query.acct_id];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}else{
			req.session.user = {
				acct_id: req.query.acct_id,
				fname: req.query.fname,
				mname: req.query.mname,
				lname: req.query.lname,
				username: req.query.username,
				password: req.query.pass,
				type: req.query.type,
				eadd: req.query.eadd,
				bday: req.query.bday,
				occ: req.query.occ,
				contno: req.query.contno
			};
			req.session.save();
			return res.send({message: 'User edited successfully!'});
		}
	});
};


exports.delete_event = function(req, res, next){
		
	var query_string = 'DELETE FROM event WHERE eventno=?';
	var request_data = [req.query.eventno];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log('2nd:')
			console.log(err);
			return res.status(500).send(err);
		}else{
			db.query('DELETE FROM eventvenue WHERE eventno=?', request_data, function(err, result){
				if(err){
					console.log(err);
					return res.status(500).send(err);
				}else return res.send({message: 'Event deleted successfully!'});
			});		
		}
	});
};

exports.delete_pending_event = function(req, res, next){
		
	var query_string = 'DELETE FROM event WHERE eventno=?';
	var request_data = [req.query.eventno];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}else{
			db.query('DELETE FROM eventvenue WHERE eventno=?', request_data, function(err, result){
				if(err){
					console.log(err);
					return res.status(500).send(err);
				}else return res.send({message: 'Pending event deleted successfully!'});
			});		
		}
	});
};

exports.pending_events = function(req, res, next){
	var query_string = 'SELECT * FROM event e, venue v, eventvenue ev, user u WHERE ev.eventno=e.eventno && ev.venue_no = v.venue_no && ev.acct_id = u.acct_id && u.acct_id = ? && e.status=? ORDER BY edate DESC';
	var request_data = [req.session.user.acct_id, 'pending'];

	db.query(query_string, request_data, function(err, result){
		// console.log(result);
		return res.send(result);

	});
};

exports.apending_events = function(req, res, next){
	var query_string = 'SELECT * FROM event e, venue v, eventvenue ev, user u WHERE ev.eventno=e.eventno && ev.venue_no = v.venue_no && ev.acct_id = u.acct_id && e.status=? ORDER BY edate DESC';
	var request_data = ['pending'];

	db.query(query_string, request_data, function(err, result){
		console.log(result);
		return res.send(result);

	});
};

exports.adelete_pending_event = function(req, res, next){
		
	var query_string = 'DELETE FROM event WHERE eventno=?';
	var request_data = [req.query.eventno];

	console.log(req.query);
	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}else{
			db.query('DELETE FROM eventvenue WHERE eventno=?', request_data, function(err, result){
				if(err){
					console.log(err);
					return res.status(500).send(err);
				}else return res.send({message: 'Pending event deleted successfully!'});
			});		
		}
	});
};

exports.approve_event = function(req, res, next){
		
	var query_string = 'UPDATE event SET status=? WHERE eventno=?';
	var request_data = ['approved',req.query.eventno];
	
	console.log(req.query.eventno);
	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}else{
			console.log(result);
			return res.send({message: 'Pending event approved successfully!'});	
		}
	});
};