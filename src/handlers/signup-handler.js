const { usersModel } = require('../models/index');
const bcrypt = require('bcrypt');

async function signUpHandler(req, res) {
    let {username, password,email,birth_date,role,gender} = req.body
    const record = await usersModel.findOne({
        where: {
            username: username
        }})
    if(!record) {
        hashedPassword = bcrypt.hashSync(password, 12)
        const record = await usersModel.create({
            username: username,
            password: hashedPassword,
            email:email,
            birth_date:birth_date,
            role:role,
            gender:gender
        })
        res.send(record)
    } else {
        res.send('user exists')
    }
}

module.exports = signUpHandler;