-- use correct database
use ogpsy;

-- create table users for storing users
create table users (
    ts timestamp not null default current_timestamp,
    id int auto_increment,
    username varchar(50),
    password varchar(255),
    name varchar(50),
    constraint users_pk primary key (id)
);

-- create table for trackers for storing tracker information
create table trackers (
    ts timestamp not null default current_timestamp,
    id int auto_increment,
    imei varchar(50),
    name varchar(50),
    hw varchar(50),
    constraint trackers_pk primary key (id)
);

-- create table of events (linked to `id` in table `users`)
create table events (
    ts timestamp not null default current_timestamp,
    id int auto_increment,
    user_id int,
    name varchar(255),
    www varchar(255),
    start time,
    public boolean,
    map varchar(255),
    corrdinates varchar(255),
    constraint events_pk primary key (id)
);

-- create table runners
create table runners (
    ts timestamp not null default current_timestamp,
    id int auto_increment,
    event_id int,
    tracker_id int,
    name varchar(50),
    club varchar(50),
    country varchar(3),
    track mediumtext,
    start time,
    constraint runners_pk primary key (id)
);
create index runners_event_id_i on runners (event_id);