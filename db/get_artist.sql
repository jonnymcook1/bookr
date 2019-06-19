SELECT * FROM artist
JOIN users
ON users.user_id = artist.users_id
WHERE users.user_id = $1