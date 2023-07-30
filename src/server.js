require('dotenv').config()
const express = require('express');
const app = express();
const courseRouter =require('./routes/coursesRouter') ;
const userRouter = require ('./routes/userRouter')
const studentsCoursesRouter = require('./routes/studentsCoursesRouter')
const instructorsCoursesRouter = require('./routes/instructorsCoursesRouter')
const departmentsRouter = require('./routes/departmentsRouter')


app.use(express.json())
app.use(courseRouter)
app.use(userRouter)
app.use(studentsCoursesRouter)
app.use(instructorsCoursesRouter)
app.use(departmentsRouter)
app.get('/',(req,res)=>{
    res.json("welcome to the home page")
})
function start(port){
    app.listen(port,()=>{
        console.log(`The website is up and listen on port ${port}`);
    })}
    module.exports= {
        app : app,
        start : start,
    }