INSERT INTO artist (artist_name, users_id, genre, description, image_url, insta_url, fb_url, spotify_url, email)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;

