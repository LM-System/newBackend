require('dotenv').config()
const { usersModel } = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function signInHandler(req, res) {
    const {username, password} = req.body;
    const record = await usersModel.findOne({
        where: {
            username: username,
        }
    });
    if(record) {
        const validPassword = await bcrypt.compare(password, record.password);
        if(validPassword) {
            record.token = jwt.sign({record}, process.env.ACCESS_TOKEN_SECRET)
            res.json(record)
        } else {
            res.send('invalid username/password')
        }
    } else {
        res.send('invalid username/password')
    }
}
module.exports = signInHandler