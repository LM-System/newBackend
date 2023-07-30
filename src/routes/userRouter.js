const express = require('express');
const userRouter = express.Router();

const signUpHandler = require('../handlers/signup-handler')
const signInHandler = require('../handlers/signin-handler');
const { usersModel,coursesModel,departmentsModel } = require('../models/index');


userRouter.post('/signup', signUpHandler)
userRouter.post('/signin', signInHandler)
userRouter.get('/users', handleGetAll);

async function handleGetAll(req, res) {
    let allRecords = await usersModel.findAll({attributes:['id','username','email','gender','birth_date','role'],
    include:[{model:coursesModel,attributes:['id','name','description','start_date','end_date'],include:{all:true}}
    ,{model:usersModel,as:'institution',attributes:['id','username','email','gender','birth_date','role']},
    {model:departmentsModel,attributes:['id','name']}]});
    res.status(200).json(allRecords);
  }
module.exports = userRouter;