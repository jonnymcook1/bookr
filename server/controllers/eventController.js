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
    },

    acceptedEvent: (req, res) => {
        console.log(req.params)
        console.log(req.body)
        const db = req.app.get('db')
        const {event_id} = req.params
        
        db.accepted_event(event_id)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(500).send(`acceptedEvent: ${error}`))
    }, 

    deleteEvent: (req, res) => {
        const db = req.app.get('db')

        db.deleteEvent(req.params.id)
            .then(response => res.status(200).json(response))
            .catch(error => res.status(500).send(`deleteEvent: ${error}`))
    },

    getShow: (req, res) => {
        console.log(req.params)
        const db = req.app.get('db')
        const {id} = req.params
        if(req.session.user) {
            if(+id === req.session.user.user_id) {
                db.get_show_user(+id)
                .then(response => res.status(200).json(response))
                .catch(error => res.status(500).send(`getShow: ${error}`))
            } else {
                db.get_show_artist(+id)
                .then(response => res.status(200).json(response))
                .catch(error => res.status(500).send(`getShow: ${error}`))
            }
        }
        else {
        db.get_show_artist(+id)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).send(`getShow: ${error}`))
    }
    }

}