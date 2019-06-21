SELECT * FROM event
JOIN users
ON users.user_id = event.users_id
WHERE users.user_id = $1