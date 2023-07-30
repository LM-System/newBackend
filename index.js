require("dotenv").config();
const port = process.env.PORT;
const app = require('./src/server')
const { db } = require('./src/models/index')

db.sync({force:false,alter:true})
  .then(()=>{
app.start(port);
})