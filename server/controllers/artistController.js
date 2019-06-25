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

        
        const user = await db.get_artist(req.session.user.user_id || req.query.id)
        // console.log(req.query.id)
        console.log(req.session.user)
        // if(user){
            // console.log(user[0])
            return res.status(200).send(user) 

        // else{
        //     res.status(500).send({error:'Error'});
        // }
    } 
}