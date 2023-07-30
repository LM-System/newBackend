const express = require('express');
const departmentsRouter = express.Router();
const {departmentsModel}= require('../models/index')
departmentsRouter.get('/departments', handleGetAll);
departmentsRouter.get('/department/:id', handleGetOne);
departmentsRouter.post('/department', handleCreate);
departmentsRouter.put('/department/:id', handleUpdate);
departmentsRouter.delete('/department/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await departmentsModel.findAll({include:{all:true}});
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await departmentsModel.findOne({where:{id:id},attributes:['name','description','start_date','end_date'],include:[{model:usersModel,as:'students',attributes:['username','email','gender','birth_date','role']},{model:usersModel,as:'instructor',attributes:['username','email','gender','birth_date','role']}]})
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await departmentsModel.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await departmentsModel.findOne({where:{id}}).update(obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await departmentsModel.destroy({where:{id}});
  res.status(204).json(deletedRecord);
}


module.exports = departmentsRouter;