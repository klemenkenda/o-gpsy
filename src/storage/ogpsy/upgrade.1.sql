-- use correct database
use ogpsy;

-- create table users for storing users
create table users (
    ts timestamp not null default current_timestamp,
    id int auto_increment,
    user_id int,
    username varchar(50),
    password varchar(255),
    name varchar(50),
    type int,
    constraint users_pk primary key (id)
) collate=utf8_slovenian_ci;

-- create table for trackers for storing tracker information
create table trackers (
    ts timestamp not null default current_timestamp,
    id int auto_increment,
    uuid varchar(20),
    name varchar(50),
    hw varchar(50),
    constraint trackers_pk primary key (id)
) collate=utf8_slovenian_ci;

-- create table of maps
create table maps (
    ts timestamp not null default current_timestamp,
    id int auto_increment,
    name varchar(255),
    filename varchar(255),
    coordinates varchar(255),
    constraint maps_pk primary key (id)
) collate=utf8_slovenian_ci;

-- create table of events (linked to `id` in table `users`, linked to `id` in table ˛`maps`)
create table events (
    ts timestamp not null default current_timestamp,
    id int auto_increment,
    user_id int,
    name varchar(255),
    www varchar(255),
    start time,
    end time,
    active boolean,
    public boolean,
    map_id int,
    constraint events_pk primary key (id)
) collate=utf8_slovenian_ci;

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
) collate=utf8_slovenian_ci;
create index runners_event_id_i on runners (event_id);

-- create points
create table points (
    ts timestamp not null default current_timestamp,
    runner_id int,
    lat double,
    lon double
);
create index point_runner_id_i on points (runner_id);
create index point_ts_i on points (ts);