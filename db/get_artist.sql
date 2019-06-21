SELECT * FROM artist 
JOIN event ON event.artist_id = artist.artist_id 
WHERE artist.users_id = $1