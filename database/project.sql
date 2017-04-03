-- CREATE USER 'project'@'localhost' IDENTIFIED BY 'tiger';
CREATE DATABASE project;
-- GRANT ALL ON project.* TO 'project'@'localhost';

USE project;
create table user(
	acct_id int(5) not null auto_increment primary key,
	username varchar(20),
	pass varchar(30),
	fname varchar(20),
	mname varchar(20),
	lname varchar(20),
	bday date,
	eadd varchar(30),
	occ varchar(20),
	contno int(15),
	type varchar(10),
	constraint username unique (username)
	
);

create table event (
	eventno int(5) not null primary key auto_increment,
	ename varchar(50),
	edate date,
	etime time,
	eduration time,
	epurpose varchar(50),
	eattendees int(6),
	status varchar(10)
); 

create table venue (
	venue_no int(5) not null primary key auto_increment,
	vname varchar(30),
	vcapacity int(6),
	vprice int(6),
	vaddress varchar(30),
	constraint venuename unique (vname)
);

create table reguser (
	reguser_id int(5) not null auto_increment primary key,
	acct_id int(5),
	constraint reguser_acct_id_fk foreign key(acct_id) references user(acct_id) on delete cascade on update cascade
);

create table admin (
	adminid int(5) not null primary key auto_increment,
	admin_acctid int(5),
	constraint admin_admin_acctid_fk foreign key(admin_acctid)
		references user(acct_id) on delete cascade on update cascade
);
create table arranging (
	reguser_id int(5),
	eventno int(5),
	adate date,
	constraint arranging_reguser_id_fk foreign key(reguser_id)
		references reguser(reguser_id) on delete cascade on update cascade,
	constraint arranging_eventno_fk foreign key(eventno)
		references event(eventno) on delete cascade on update cascade
);

create table event_approval (
	app_no int(5),
	app_aid int(5),
	date_approved date,
	constraint event_approval_eventno_fk foreign key(app_no) 
		references event(eventno) on delete cascade on update cascade,
	constraint event_approval_adminid_fk foreign key(app_aid) 
		references admin(adminid) on delete cascade on update cascade

);
create table eventvenue(
	acct_id int(5),
	eventno int(5),
	venue_no int(5),
	constraint eventvenue_eventno_fk foreign key(eventno)
		references event(eventno) on delete cascade on update cascade,
	constraint eventvenue_venue_no_fk foreign key(venue_no)
		references venue(venue_no) on delete cascade on update cascade
	
);
create table handle (
	adminid int(5),
	venue_no int(5),
	constraint handle_adminid_fk foreign key(adminid)
		references admin(adminid) on delete cascade on update cascade,
	constraint handle_venue_no_fk foreign key(venue_no)
		references venue(venue_no)	on delete cascade on update cascade

);
create table managing (
	adminid int(5),
	reguser_id int(5),
	datevalidated date,
	constraint managing_adminid_fk foreign key(adminid)
		references admin(adminid) on delete cascade on update cascade,
	constraint managing_reguser_id_fk foreign key(reguser_id)
		references reguser(reguser_id) on delete cascade on update cascade

);

load data local infile 'user.csv' 
into table user 
fields terminated by ',' 
lines terminated by '\n';

load data local infile 'venue.csv'
into table venue
fields terminated by ','
lines terminated by '\n';

load data local infile 'event.csv'
into table event
fields terminated by ','
lines terminated by '\n';

insert into admin(admin_acctid) values(1);
insert into reguser(acct_id) values(2);
insert into reguser(acct_id) values(3);
insert into reguser(acct_id) values(4);
insert into reguser(acct_id) values(5);	

-- Events with Venues -- 
insert into eventvenue values(5, 1, 00005);
insert into eventvenue values(5, 2, 00001);
insert into eventvenue values(5, 3, 00002);
insert into eventvenue values(5, 4, 00003);
insert into eventvenue values(5, 5, 00004);
insert into eventvenue values(5, 6, 00006);
insert into eventvenue values(5, 7, 00007);
insert into eventvenue values(1, 8, 00008);
insert into eventvenue values(2, 9, 00009);
insert into eventvenue values(3, 10, 00010);
insert into eventvenue values(4, 11, 00011);