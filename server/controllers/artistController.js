module.exports = {
    createArtist: async (req,res) => {
        console.log(req.body)
        const {artist_name, users_id, genre, description, image_url, insta_url, fb_url, spotify_url, email} = req.body
        const artist = await req.app.get('db').create_artist(artist_name, users_id, genre, description, image_url, insta_url, fb_url, spotify_url, email)

        res.status(200).json(artist)
    },

    getArtist: async (req, res) => {
        const artist = req.app.get('db').get_artist(req.session.user_id)

        res.status(200).json(artist)
    }
}