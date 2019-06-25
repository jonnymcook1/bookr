UPDATE event
SET accepted = NOT accepted, reviewed = NOT reviewed
WHERE event_id = $1
RETURNING *;