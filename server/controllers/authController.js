const bcrypt = require('bcryptjs')

module.exports = {
    registerUser: (req, res) => {
        console.log(req.body)
        const {username, password} = req.body
        const db = req.app.get('db')

        db.findUser(username).then((userList) => {
            if(userList.length = 0 ){
                res.status(403).json({error: 'Username taken '})
            } else {
                bcrypt.hash(password, 12).then((newPassword) => {
                    db.addUser(username, newPassword).then(() => {
                        res.status(200).json(username)
                    })
                })
            }
        })
    },

    loginUser: (req, res) =>{
        const {username, password} = req.body
        const db = req.app.get('db')

        db.findUser(username).then((user) => {
            if(!user.length){
                res.status(404).json({error: 'User does not exist'});
            } else {
                bcrypt.compare(password, user[0].password).then((doesMatch) =>{
                    if(!doesMatch){
                        res.status(403).json({error: 'Username or password is incorrect'});
                    } else {
                        req.session.user = {
                            username: user[0].username
                        }
                    };
                    res.status(200).json(req.session.user)
                })
            }
        })
    },

    getUser: (req, res) => {
        if(req.session.user){
            res.json(req.session.user)
        }else {
            res.status(401).json({error: 'Please log in'})
        }
    },

    logout: (req, res) => {
       req.session.destroy()
       res.status(200).send(req.session)
    }
}