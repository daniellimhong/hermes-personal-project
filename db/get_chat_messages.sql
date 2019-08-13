-- select * from chat_rooms join messages
-- on (chat_rooms.chat_id = messages.chat_id)
-- where chat_rooms.chat_id = $1;

-- select * from messages
-- where chat_id = $1;

select username, chat_id, content, date_time from users join messages
on (users.user_id = messages.user_id)
where messages.chat_id = $1
order by date_time ASC;