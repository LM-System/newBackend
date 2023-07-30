const express = require('express');
const studentsCoursesRouter = express.Router();
const {studentsCoursesModel} = require('../models/index');


studentsCoursesRouter.get('/studentscourses', handleGetAll);
studentsCoursesRouter.post('/studentscourses', handleCreate);
studentsCoursesRouter.put('/studentscourses/:id', handleUpdate);
studentsCoursesRouter.delete('/studentscourses/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await studentsCoursesModel.findAll();
  res.status(200).json(allRecords);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await studentsCoursesModel.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await studentsCoursesModel.findOne({where:{id}}).update(obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await studentsCoursesModel.destroy({where:{id}});
  res.status(204).json(deletedRecord);
}


module.exports = studentsCoursesRouter;