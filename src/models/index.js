require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const users = require('./mainModels/users')
const courses = require('./mainModels/courses')
const users_courses = require('./mainModels/users_courses')

const POSTGRES_URI = process.env.NODE_ENV === "test" ? "sqlite::memory:" : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === "production" ?
{
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
} :
{}

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const usersModel = users(sequelize,DataTypes)
const coursesModel = courses(sequelize,DataTypes)
const users_coursesModel = users_courses(sequelize,DataTypes)

coursesModel.belongsToMany(usersModel,{through:users_coursesModel,as:'students'})
usersModel.belongsToMany(coursesModel,{through:users_coursesModel})
coursesModel.belongsTo(usersModel,{
    foreignKey: 'instructorId',
    as:'instructor'
})
usersModel.hasMany(coursesModel,{
    foreignKey: 'instructorId',
    // as:'instructor'

})




module.exports = {
    db:sequelize,
    usersModel,
    coursesModel,
    users_coursesModel

}
