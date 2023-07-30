const { usersModel } = require('../models/index');
const bcrypt = require('bcrypt');

async function signUpHandler(req, res) {
    let {password,email} = req.body
    const record = await usersModel.findOne({
        where: {
            email: email
        }})
    if(!record) {
        hashedPassword = bcrypt.hashSync(password, 12)
        const record = await usersModel.create({
            ...req.body,
            password:hashedPassword
        })
        res.send(record)
    } else {
        res.send('user exists')
    }
}

module.exports = signUpHandler;