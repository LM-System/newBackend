require('dotenv').config()
const express = require('express');
const app = express();
const courseRouter =require('./routes/coursesRouter') ;
const userRouter = require ('./routes/userRouter')
const users_coursesRouter = require('./routes/users_coursesRouter')


app.use(express.json())
app.use(courseRouter)
app.use(userRouter)
app.use(users_coursesRouter)
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