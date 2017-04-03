//I will use snake_case here for functions

'use strict';

(function(){
	angular
		.module('app')
		.controller('UserCtrl', UserCtrl);

	UserCtrl.$inject = ['$scope', '$window', 'UserService'];

	function UserCtrl($scope, $window, UserService) {

		// $scope.uname = "Ma'am Betel De Robles";
		$scope.data = {
			fname: "",
			mname: "",
			lname: "",
			bday: "",
			occ: "",
			email: "",
			contactnum: "",
			username: "",
			password: "",
			repassword: "",
			type: "",
			ename: "",
			edatef: "",
			etime: "",
			eduration: "",
			venue: "",
			epurpose: "",
			ettandees: 0,
			search: ""
		}

		$scope.sign_in = function(){
			$scope.clicked = function(){
				const data = {
					email: $scope.email,
					password: $scope.password
				};

				console.log("Cont:" + data.email + "," + data.password);
				UserService
					.signIn(data)
					.then(function(res) {
                        if (res.value != 0){
							console.log(res.type);
							$scope.user = res;
							console.log($scope.user.type);
							if(res.type == "admin") $window.location.href = '/#/admin';
							else $window.location.href = '/#/user';
						}
						else{
							alert(res.message);
						}
					}, function(err){
						$window.location.reload();
					})
			}
		}

		$scope.sign_out = function(){
			$scope.sign_out_clicked = function(){
				UserService
					.signOut()
					.then(function(res){
						console.log(res);
						$window.location.href = '/#/sign_in';
					}, function(err){
						alert(err.statusText);
					})
			}
		}

		$scope.create_account = function(){
			$scope.clicked = function(){
				if($scope.password == $scope.repassword){
					const data = {
						fname: $scope.fname,
						mname: $scope.mname,
						lname: $scope.lname,
						bday: $scope.bday,
						occ: $scope.occ,
						type: $scope.type,
						email: $scope.email,
						contactnum: $scope.contactnum,
						username: $scope.username,
						password: $scope.password,
						repassword: $scope.repassword
					}
				
					UserService
						.createAccount(data)
						.then(function(res) {
	                        console.log(res);
	                    	alert(res.message);
	                    	$window.location.href ='/#/sign_in';
	                    }, function(err) {
	                        console.log(err);
	                        alert("Account already existing!");
	                        $window.location.href ='/#/create_account';
	                    })
	            }else{
	            	alert("Password mismatch! Please try again.");
	            }
			}
		}


		$scope.get_events = function() {
            UserService
                .getEvents()
                .then(function (res){
                    $scope.events = res.data;
                } ,function(err) {
                        console.log(err);
                })
        }

        $scope.add_event = function(){
			$scope.clicked = function(){
				const data = {
					ename: $scope.ename,
					edate: $scope.edate,
					etime: $scope.etime,
					eduration: $scope.eduration,
					vname: $scope.venue,
					eattendees: $scope.eattendees,
					epurpose: $scope.epurpose
				}				
				
				console.log(data);					
				UserService
					.addEvent(data)
					.then(function(res) {
	                    if(res.message == 'Account created successfully!'){
	                    	alert(res.message);
		 	               	$window.location.href ='http://localhost:7000/#/user';	
	                    }else{
	                    	alert(res.message);
	                    }       
	                }, function(err) {
	                    console.log(err);
	                    alert("Date and time already occupied! Please try another one.")
	                   	$window.location.href ='http://localhost:7000/#/user_add_event';
	                })
		       
				}
		}

		$scope.get_logged = function(){
			UserService
				.getLogged()
				.then(function(res){
					$scope.logged_user = res;
					console.log(res);
				}, function(err){
					alert(err.statusText);
				})
		}

		
		$scope.search_event = function() {
            $scope.search_click = function(){
	            const data = {
	            	search: $scope.search
	            }

	            console.log(data);
	            UserService
	                .searchEvent(data)
	                .then(function (res){
                    	console.log(res)
                    	$scope.events = res.data;
	                } ,function(err) {
	                        console.log(err);
	                })
	            }
        }

        $scope.edit_event = function(event){
			$scope.edit_event_clicked = function(toedit){
				var index = $scope.events.indexOf(event);
				var eventy = $scope.events[index];
				console.log(eventy);
				
				const data = {
					eventno: eventy.eventno,
					ename: $scope.ename,
					edate: $scope.edate,
					etime: $scope.etime,
					eduration: $scope.eduration,
					eattendees: $scope.eattendees,
					epurpose: $scope.epurpose
				}

				console.log(data);

				UserService
					.editEvent(data)
					.then(function(res){
						alert(res.message);
					}, function(err){
						alert(err.statusText);
					})
				
				UserService
	                .getEvents()
	                .then(function (res){
	                    $scope.events = res.data;
	                } ,function(err) {
	                        console.log(err);
	                })
			}
		}


		$scope.get_venues = function() {
            UserService
                .getVenues()
                .then(function (res){
                    $scope.venues = res.data;
                } ,function(err) {
                        console.log(err);
                })
        }


        $scope.search_venue = function() {
            $scope.search_venue_click = function(){
	            const data = {
	            	search: $scope.search
	            }

	            console.log(data);
	            UserService
	                .searchVenue(data)
	                .then(function (res){
	                	console.log(res)
	                    $scope.venues = res.data;
	                } ,function(err) {
	                        console.log(err);
	                })
	            }
        }


        $scope.delete_event = function(event){
            console.log(event);
            var index = $scope.events.indexOf(event);
            var eventy = $scope.events[index];
            const data = {
                eventno: eventy.eventno
            }

            console.log(data);

            UserService
                .deleteEvent(data)
                .then(function(res){
                    alert(res.message);
                }, function(err){
                    alert(err.statusText);
                })
            
            UserService
                .getEvents()
                .then(function (res){
                    $scope.events = res.data;
                } ,function(err) {
                        console.log(err);
                })
        }

        $scope.get_pending_events = function() {
            UserService
                .pendingEvents()
                .then(function (res){
                    $scope.events = res.data;
                } ,function(err) {
                        console.log(err);
                })
        }

        $scope.delete_pending_event = function(event){
            console.log(event);
            var index = $scope.events.indexOf(event);
            var eventy = $scope.events[index];
            const data = {
                eventno: eventy.eventno
            }

            console.log(data);

            UserService
                .deletePendingEvent(data)
                .then(function(res){
                    alert(res.message);
                }, function(err){
                    alert(err.statusText);
                })
            
            UserService
                .pendingEvents()
                .then(function (res){
                    $scope.events = res.data;
                } ,function(err) {
                        console.log(err);
                })
        }


		$scope.print = function(){
            let table = document.getElementById('Events').innerHTML;
            let eventWindow = $window.open('', '', 'width=800, height=600');
            eventWindow.document.write(table);
            eventWindow.print();

        }
		
	}
})();
