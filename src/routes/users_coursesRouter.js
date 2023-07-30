const express = require('express');
const users_coursesRouter = express.Router();
const {users_coursesModel,usersModel,coursesModel} = require('../models/index');


users_coursesRouter.get('/user_courses', handleGetAll);
// users_coursesRouter.get('/user_courses/:id', handleGetOne);
users_coursesRouter.post('/user_courses', handleCreate);
users_coursesRouter.put('/user_courses/:id', handleUpdate);
users_coursesRouter.delete('/user_courses/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await users_coursesModel.findAll();
  res.status(200).json(allRecords);
}

// async function handleGetOne(req, res) {
//   const id = req.params.id;
//   let theRecord = await users_coursesModel.findOne({where:{id:id}})
//   res.status(200).json(theRecord);
// }

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await users_coursesModel.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await users_coursesModel.findOne({where:{id}}).update(obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await users_coursesModel.destroy({where:{id}});
  res.status(204).json(deletedRecord);
}


module.exports = users_coursesRouter;