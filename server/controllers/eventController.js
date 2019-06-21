module.exports = {
    createEvent: async (req,res) => {
        console.log(req.body)
        const {artist_id, event_name, event_type, event_date, event_time, event_duration, event_description, venue_name, address, city, state, zip_code, booking_price} = req.body
        const event = await req.app.get('db').create_event(artist_id, event_name, event_type, event_date, event_time, event_duration, event_description, venue_name, address, city, state, zip_code, booking_price)

        res.status(200).json(event)
    },

    getEvent: (req, res) => {
        const db = req.app.get('db'),
        {id} = req.params
        //  console.log(id)
        db.get_event(id)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(500).send(`getEvent: ${error}`))
    }
 
}