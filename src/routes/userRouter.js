const express = require('express');
const userRouter = express.Router();

const signUpHandler = require('../handlers/signup-handler')
const signInHandler = require('../handlers/signin-handler');
const { usersModel } = require('../models/index');
const { coursesModel } = require('../models/index');


userRouter.post('/signup', signUpHandler)
userRouter.post('/signin', signInHandler)
userRouter.get('/users', handleGetAll);

async function handleGetAll(req, res) {
    let allRecords = await usersModel.findAll({include:[{all:true,include:{model:usersModel,as:'instructor'}}]});
    res.status(200).json(allRecords);
  }
module.exports = userRouter;