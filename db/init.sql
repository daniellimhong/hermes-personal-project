drop table if exists users cascade;
drop table if exists chat_rooms cascade;
drop table if exists users_in_chat_rooms cascade;
drop table if exists messages cascade;

create table users (
    user_id serial primary key,
    username varchar(32) not null,
    password text not null,
    email text not null,
    profile_picture text default('https://img.icons8.com/ios-filled/100/000000/cat-profile.png')
);

create table chat_rooms (
    chat_id serial primary key,
    chat_name text not null
);

create table users_in_chat_rooms (
    id serial primary key,
    chat_id int references chat_rooms(chat_id),
    user_id int references users(user_id)
);

create table messages (
    msg_id serial primary key,
    user_id int references users(user_id),
    chat_id integer references chat_rooms(chat_id),
    content text,
    date_time timestamp not null default current_timestamp
);

-- update the following to join
1
select * from users join users_in_chat_rooms
on (users.user_id = users_in_chat_rooms.user_id);

select * from chat_rooms join messages
on (chat_rooms.chat_id = messages.chat_id);

-- 

-- select * from users 