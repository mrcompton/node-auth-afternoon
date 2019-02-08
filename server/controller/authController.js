const bcrypt = require('bcryptjs')

module.exports = {
    login: async(req,res) => {

        const { username, password } = req.body
        const dbInstance = req.app.get('db')

        const foundUser = await dbInstance.get_user([username])
        const user = foundUser[0]

        if(!user){
            return res.status(401).send('User not found. Please register as a new user before logging in.')
        }

        const isAuthenticated = bcrypt.compareSync(password,user.hash)
        if(!isAuthenticated){
            return res.status(403).send('Incorrect password')
        }

        req.session.user = {isAdmin: user.isadmin, id: user.id, username: user.username}
        return res.send(req.session.user)
    },
    register: async (req,res) => {
        const {username, password, isAdmin} = req.body
        const dbInstance = req.app.get('db')

        const checkUser = await dbInstance.check_existing_user([username])
        const existingUser = checkUser[0]

        if(existingUser){
            return res.status(409).send('Username taken')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const userArray = await dbInstance.register_user([isAdmin,username,hash])
        const user = userArray[0]
        console.log(user)
        req.session.user = {isAdmin: user.isadmin, id: user.id, username: user.username}
        console.log(req.session.user,req.body.isAdmin)
        return res.status(200).send(req.session.user)
    },

    logout: (req,res) => {
        req.session.destroy()
        return res.sendStatus(200)
    }
} 