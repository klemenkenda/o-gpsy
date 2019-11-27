-- users
insert into users (username, password, name, type) values ('admin', 'pass', 'Temporary Admin', 99);

-- trackers
insert into trackers (uuid, name, hw) values ('ph001', 'My phone', 'Samsung Galaxy S9');

-- maps
insert into maps (name, filename, coordinates) values ('Ljubljana - Vic', 'ljubljana-vic.jpg', '46.049578_14.4795_46.049594_14.498732_46.040151_14.498755_46.040191_14.47962');

-- events
insert into events (user_id, name, map_id) values (1, 'Test event No. 1', 1);

-- runners
insert into runners (event_id, tracker_id, name, club, country) values (1, 1, 'Klemen Kenda', 'OK Azimut', 'SLO');