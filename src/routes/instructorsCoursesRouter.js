const express = require('express');
const instructorsCoursesRouter = express.Router();
const {instructorsCoursesModel} = require('../models/index');


instructorsCoursesRouter.get('/instructorscourses', handleGetAll);
instructorsCoursesRouter.post('/instructorscourses', handleCreate);
instructorsCoursesRouter.put('/instructorscourses/:id', handleUpdate);
instructorsCoursesRouter.delete('/instructorscourses/:id', handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await instructorsCoursesModel.findAll();
  res.status(200).json(allRecords);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await instructorsCoursesModel.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await instructorsCoursesModel.findOne({where:{id}}).update(obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await instructorsCoursesModel.destroy({where:{id}});
  res.status(204).json(deletedRecord);
}


module.exports = instructorsCoursesRouter;