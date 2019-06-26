const bcrypt = require('bcryptjs')

module.exports = {
    registerUser: async (req, res) => {
        // console.log(req.body)
        const {username, password} = req.body
        const db = req.app.get('db')

        const foundUser = await db.findUser(username)

        if(foundUser[0]){
            res.status(403).json({error: 'Username taken '})
            return
        } 

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const regUser = await db.addUser(username, hash)

        if(regUser[0]){
            // req.session.user = {
            //     username: regUser[0].username,
            //     user_id: regUser[0].user_id
            // }
            // console.log(req.session.user)
            res.status(200).json(regUser[0].user_id)
        }
            
    },

    loginUser: async (req, res) => {
        // console.log(req.body)
        const {username, password} = req.body
        const db = req.app.get('db')

        const user = await db.findUser(username)
        if(user.length === 0){
            res.status(404).json({error: 'User does not exist'});
        } else {

            const hash = await bcrypt.compare(password, user[0].password)

            if(!hash){
                res.status(403).json({error: 'Username or password is incorrect'});
            } else {
                 req.session.user = {
                    username: user[0].username,
                    user_id: user[0].user_id,
                    // event: event[0] ? event[0].event_id : null
                }
                res.status(200).json(req.session.user)
            };
        }
        
        
    },
    
    getUser: (req, res) => {
  console.log(req.session.user)
        if(req.session.user){
            res.status(200).json(req.session.user)
        }else {
            res.status(401).json({error: 'Please log in'})
        }
    },

    logout: (req, res) => {
       req.session.destroy()
       res.status(200).send(req.session)
    }
}