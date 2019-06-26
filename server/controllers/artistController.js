module.exports = {
    createArtist: async (req,res) => {
        console.log(req.body)
        const {artist_name, users_id, genre, description, image_url, insta_url, fb_url, spotify_url, email} = req.body
        const artist = await req.app.get('db').create_artist(artist_name, users_id, genre, description, image_url, insta_url, fb_url, spotify_url, email)

        return res.status(200).json(artist)
    },

    getArtist: async (req, res) => {
        const db = req.app.get('db')
        console.log(req.session.user)

        console.log(req.query.id)
        if(req.session.user){
            const user = await db.get_artist(req.session.user.user_id || req.query.id)
            return res.status(200).send(user)
        }
        else{
            const user = await db.get_artist(req.query.id)
            console.log(user)
            return res.status(200).send(user)
        }
         
    },

    getGenre: (req, res) => {
        const db = req.app.get('db')
        const {genre} = req.params

         db.get_genre(genre)
         .then(response => res.status(200).json(response))
         .catch(error => res.status(500).send(`getGenre: ${error}`))
    }
}