--avaa komentorivityökalu
--docker exec -it ff3f49eadf27 psql -U postgres postgres

insert into users (username, name, created_at, updated_at, disabled) values ('timo@eduskunta.fi', 'Timo Soini', '2024-10-12 06:44:15.433+00', '2024-10-12 06:44:15.433+00', false);
insert into users (username, name, created_at, updated_at, disabled) values ('paavo@eduskunta.fi', 'Paavo Arhinmäki', '2024-10-12 06:44:15.433+00', '2024-10-12 06:44:15.433+00', false);
insert into blogs (author, url, title, likes, user_username) values ('Paavo A.', 'http://p2.fi', 'Vasuriblogi', 1, 'paavo@eduskunta.fi');
insert into blogs (author, url, title, likes, user_username) values ('Soini', 'http://s1.fi', 'Timon Ploki', 1, 'timo@eduskunta.fi');
insert into blogs (author, url, title, likes, user_username) values ('T. Soini', 'http://s2.fi', 'Toinen Plokini', 1, 'timo@eduskunta.fi');
insert into readings (username, blog_id) values ('timo@eduskunta.fi', 1);
insert into readings (username, blog_id) values ('timo@eduskunta.fi', 2);
insert into readings (username, blog_id) values ('paavo@eduskunta.fi', 3);
update users set disabled=true where username='paavo@eduskunta.fi';