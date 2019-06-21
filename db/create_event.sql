INSERT INTO event (artist_id, event_name, event_type, event_date, event_time, event_duration, event_description, venue_name, address, city, state, zip_code, booking_price)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;
