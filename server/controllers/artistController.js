module.exports = {
    createArtist: async (req,res) => {
        console.log(req.body)
        const {artist_name, users_id, genre, description, image_url, insta_url, fb_url, spotify_url, email} = req.body
        const artist = await req.app.get('db').create_artist(artist_name, users_id, genre, description, image_url, insta_url, fb_url, spotify_url, email)

        res.status(200).json(artist)
    },

    getArtist: async (req, res) => {
        const db = req.app.get('db')
        
        const user = await db.get_artist(req.params.id)
        if(user[0]){
            console.log(user[0])
            res.status(200).json(user[0])}

        else{
            res.status(500).send({error:'Error'});
        }
    }

    // getArtist: (req, res) => {
    //     console.log(req.session.user)
    //           if(req.params.id){
    //               res.status(200).json(req.params.id)
    //           }else {
    //               res.status(401).json({error: 'Please log in'})
    //           }
    //       }
      
}