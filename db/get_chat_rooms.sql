select * from users join users_in_chat_rooms uc
on (users.user_id = uc.user_id)
join chat_rooms
on (chat_rooms.chat_id = uc.chat_id)
where users.user_id = $1;