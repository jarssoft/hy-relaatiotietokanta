CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);

insert into blogs (author, url, title) values ('Jari', 'http://', 'Myblog');
insert into blogs (author, url, title) values ('Timo Soini', 'http://ploki.fi', 'Soinin ploki');

--insert into readings (username, blog_id) values ('timo@eduskunta.fi', 3);