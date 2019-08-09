insert into chat_rooms(chat_name)
values($1);

select * from chat_rooms
where chat_name = $1;