//I will use snake_case here for functions

'use strict';

(function(){
	angular
		.module('app')
		.controller('AdminCtrl', AdminCtrl);

	AdminCtrl.$inject = ['$scope', '$window', 'AdminService'];

	function AdminCtrl($scope, $window, AdminService) {

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
            edate: "",
            etime: "",
            eduration: "",
            venue: "",
            epurpose: "",
            ettandees: 0,
            search: ""
        }

        $scope.sign_out = function(){
            $scope.sign_out_clicked = function(){
                AdminService
                    .signOut()
                    .then(function(res){
                        console.log(res);
                        $window.location.href = '/#!/sign_in';
                    }, function(err){
                        alert(err.statusText);
                    })
            }
        }

        $scope.create_admin_account = function(){
            $scope.clicked = function(){
                if($scope.password == $scope.repassword){
                    const data = {
                        fname: $scope.fname,
                        mname: $scope.mname,
                        lname: $scope.lname,
                        bday: $scope.bday,
                        occ: $scope.occ,
                        email: $scope.email,
                        contactnum: $scope.contactnum,
                        type: $scope.type,
                        username: $scope.username,
                        password: $scope.password,
                        repassword: $scope.repassword
                    }
                
                    AdminService
                        .createAdminAccount(data)
                        .then(function(res) {
                            console.log(res);
                            alert(res.message);
                            $window.location.href ='/#!/admin';
                        }, function(err) {
                            console.log(err);
                            alert("Account already existing!");
                            $window.location.href ='/#!/admin';
                        })
                }else{
                    alert("Password mismatch! Please try again.");
                }
            }
        }


        $scope.get_logged = function(){
            AdminService
                .getLogged()
                .then(function(res){
                    $scope.logged_user = res;
                    console.log(res);
                }, function(err){
                    alert(err.statusText);
                })
        }

		$scope.get_all_events = function() {
            AdminService
                .getAllEvents()
                .then(function (res){
                    $scope.events = res.data;
                    console.log(res.data);
                } ,function(err) {
                        console.log(err);
                })
        }

        $scope.get_users = function() {
            AdminService
                .getUsers()
                .then(function (res){
                    $scope.users = res.data;
                    console.log(res.data);
                } ,function(err) {
                        console.log(err);
                })
        }

        $scope.get_venues = function() {
            AdminService
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
                AdminService
                    .searchVenue(data)
                    .then(function (res){
                        console.log(res)
                        $scope.venues = res.data;
                    } ,function(err) {
                            console.log(err);
                    })
                }
        }

        $scope.search_event = function() {
            $scope.search_event_click = function(){
                const data = {
                    search: $scope.search
                }

                console.log(data);
                AdminService
                    .searchEvent(data)
                    .then(function (res){
                        console.log(res)
                        $scope.events = res.data;
                    } ,function(err) {
                            console.log(err);
                    })
                }
        }

        $scope.edit_venue = function(venue){
            $scope.edit_venue_clicked = function(toedit){
                console.log(venue);
                var index = $scope.venues.indexOf(venue);
                var venuety = $scope.venues[index];
                console.log(venuety);
                
                const data = {
                    venueno: venuety.venue_no,
                    vname: $scope.vname,
                    capacity: $scope.vcapacity,
                    price: $scope.vprice,
                    address: $scope.vaddress
                }

                console.log(data);

                AdminService
                    .editVenue(data)
                    .then(function(res){
                        alert(res.message);
                    }, function(err){
                        alert(err.statusText);
                    })
                
                AdminService
                    .getVenues()
                    .then(function (res){
                        $scope.venues = res.data;
                    } ,function(err) {
                            console.log(err);
                    })
            }
        }


        $scope.delete_venue = function(venue){
            console.log(venue);
            var index = $scope.venues.indexOf(venue);
            var venuety = $scope.venues[index];
            console.log(venuety); 
            const data = {
                venueno: venuety.venue_no
            }

            console.log(data);

            AdminService
                .deleteVenue(data)
                .then(function(res){
                    alert(res.message);
                }, function(err){
                    alert(err.statusText);
                })
            
            AdminService
                .getVenues()
                .then(function (res){
                    $scope.venues = res.data;
                } ,function(err) {
                        console.log(err);
                })
        }


        $scope.add_venue = function(){
            $scope.add_venue_clicked = function(){ 
                const data = {
                    vname: $scope.vname,
                    capacity: $scope.vcapacity,
                    price: $scope.vprice,
                    address: $scope.vaddress
                }

                console.log(data);

                AdminService
                    .addVenue(data)
                    .then(function(res){
                        alert(res.message);
                        $window.location.href ='/#!/admin_venues';
                    }, function(err){
                        alert(err.statusText);
                    })
                
                AdminService
                    .getVenues()
                    .then(function (res){
                        $scope.venues = res.data;
                    } ,function(err) {
                            console.log(err);
                    })
            }
        }

        $scope.edit_user = function(user){
            $scope.edit_user_clicked = function(toedit){
                if($scope.password == $scope.repassword){
                    console.log(user);
                    var index = $scope.users.indexOf(user);
                    var userty = $scope.users[index];
                    console.log(userty);
                    
                    const data = {
                        acct_id: userty.acct_id,
                        fname: $scope.fname,
                        mname: $scope.mname,
                        lname: $scope.lname,
                        bday: $scope.bday,
                        occ: $scope.occ,
                        email: $scope.email,
                        contactnum: $scope.contactnum,
                        username: $scope.username,
                        password: $scope.password,
                        repassword: $scope.repassword
                    }

                    console.log(data);

                    AdminService
                        .editUser(data)
                        .then(function(res){
                            alert(res.message);
                        }, function(err){
                            alert(err.statusText);
                        })
                    
                    AdminService
                        .getUsers()
                        .then(function (res){
                            $scope.users = res.data;
                        } ,function(err) {
                                console.log(err);
                        })
                }
                else{
                    alert('Password mismatch! Please try again.')
                }
            }
        }

        $scope.edit_self = function(selfie){
            $scope.edit_user_clicked = function(toedit){
                if($scope.password == $scope.repassword){
                    const data = {
                        acct_id: selfie.acct_id,
                        fname: $scope.fname,
                        mname: $scope.mname,
                        lname: $scope.lname,
                        bday: $scope.bday,
                        occ: $scope.occ,
                        email: $scope.email,
                        contactnum: $scope.contactnum,
                        username: $scope.username,
                        password: $scope.password,
                        repassword: $scope.repassword
                    }

                    console.log(data);

                    AdminService
                        .editSelf(data)
                        .then(function(res){
                            alert(res.message);
                            $scope.logged_user = res;
                        }, function(err){
                            alert(err.statusText);
                        })
                }
                else{
                    alert('Password mismatch! Please try again.')
                }
            }
        }

        $scope.delete_user = function(user){
            var index = $scope.users.indexOf(user);
            var userty = $scope.users[index];
            console.log(userty); 
            const data = {
                acct_id: userty.acct_id,
                type: userty.type
            }

            console.log(data);

            AdminService
                .deleteUser(data)
                .then(function(res){
                    alert(res.message);
                }, function(err){
                    alert(err.statusText);
                })
            
            AdminService
                .getUsers()
                .then(function (res){
                    $scope.users = res.data;
                } ,function(err) {
                        console.log(err);
                })
        }

        $scope.get_pending_events = function() {
            AdminService
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

            AdminService
                .deletePendingEvent(data)
                .then(function(res){
                    alert(res.message);
                }, function(err){
                    alert(err.statusText);
                })
            
            AdminService
                .pendingEvents()
                .then(function (res){
                    $scope.events = res.data;
                } ,function(err) {
                        console.log(err);
                })
        }

        $scope.approve_event = function(event){
            console.log(event);
            var index = $scope.events.indexOf(event);
            var eventy = $scope.events[index];
            const data = {
                eventno: eventy.eventno
            }

            console.log(data);

            AdminService
                .approveEvent(data)
                .then(function(res){
                    alert(res.message);
                }, function(err){
                    alert(err.statusText);
                })
            
            AdminService
                .pendingEvents()
                .then(function (res){
                    $scope.events = res.data;
                } ,function(err) {
                        console.log(err);
                })
        }

        $scope.print = function(){
            let table = document.getElementById('Venues').innerHTML;
            let eventWindow = $window.open('', '', 'width=800, height=600');
            eventWindow.document.write(table);
            eventWindow.print();
        }



		
	}
})();
