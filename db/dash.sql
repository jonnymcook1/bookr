SELECT * FROM event
JOIN users
ON users.user_id = event.users_id
JOIN artist
ON event.artist_id = artist.artist_id
WHERE users.user_id = $1