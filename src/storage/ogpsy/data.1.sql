-- users
insert into users (username, password, name, type) values ('admin', 'pass', 'Temporary Admin', 99);

-- trackers
insert into trackers (uuid, name, hw) values ('ph001', 'My phone', 'Samsung Galaxy S9');

-- events
insert into events (user_id, name) values (1, 'Test event No. 1');

-- runners
insert into runners (event_id, tracker_id, name, club, country) values (1, 1, 'Klemen Kenda', 'OK Azimut', 'SLO');