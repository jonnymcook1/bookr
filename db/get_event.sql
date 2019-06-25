SELECT * FROM event
JOIN artist
ON artist.artist_id = event.artist_id
WHERE artist.artist_id = $1
AND reviewed = FALSE