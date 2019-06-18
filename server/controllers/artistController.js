module.exports = {
    createArtist: async (req,res) => {
        const {artist_name, genre, description, image_url, insta_url, fb_url, spotify_url, email} = req.body
        const artist = await req.app.get('db').create_artist(artist_name, genre, description, image_url, insta_url, fb_url, spotify_url, email)

        res.status(200).json(artist)
    }
}