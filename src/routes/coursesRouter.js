const express = require('express');
const coursesRouter = express.Router();
const {coursesModel} = require('../models/index');
const {usersModel}=require('../models/index');
const models = require('../models/index');


coursesRouter.get('/courses', handleGetAll);
coursesRouter.get('/course/:id', handleGetOne);
coursesRouter.post('/course', handleCreate);
coursesRouter.put('/course/:id', handleUpdate);
coursesRouter.delete('/course/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await coursesModel.findAll({include:{all:true}});
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await coursesModel.findOne({where:{id:id},attributes:['name','description','start_date','end_date'],include:[{model:usersModel,as:'students',attributes:['username','email','gender','birth_date','role']},{model:usersModel,as:'instructor',attributes:['username','email','gender','birth_date','role']}]})
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await coursesModel.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await coursesModel.findOne({where:{id}}).update(obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await coursesModel.destroy({where:{id}});
  res.status(204).json(deletedRecord);
}


module.exports = coursesRouter;