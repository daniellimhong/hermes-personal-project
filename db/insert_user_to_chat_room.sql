insert into users_in_chat_rooms(chat_id, user_id)
values($1, $2);

select * from chat_rooms
where chat_id = $1; 
-- check if this is correct