drop table if exists users cascade;
drop table if exists conversations cascade;
drop table if exists messages cascade;

create table users (
    user_id serial primary key,
    username varchar(32) not null,
    password text not null,
    email text not null
);

create table conversations (
    convo_id serial primary key,
    user_id1 int references users(user_id),
    user_id2 int references users(user_id)
);

create table messages (
    convo_id integer references conversations(convo_id),
    user_id int references users(user_id),
    content text,
    date_time timestamp 
);

select * from users join conversations 
on (users.user_id = conversations.user_id1 AND users.user_id = conversations.user_id2);

select * from conversations join messages
on (conversations.convo_id = messages.convo_id);