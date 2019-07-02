SELECT * FROM event
JOIN artist 
ON artist.artist_id = event.artist_id
JOIN users
ON users.user_id = artist.users_id
WHERE users.user_id = $1
AND accepted = FALSE