insert into messages(user_id, chat_id, content)
values($1, $2, $3);

select user_id, chat_id, content from messages
where content = $3;