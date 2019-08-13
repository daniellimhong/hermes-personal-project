delete from users_in_chat_rooms 
where user_id = $1 and chat_id = $2;