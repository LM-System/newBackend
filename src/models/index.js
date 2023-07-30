require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const users = require('./mainModels/users')
const courses = require('./mainModels/courses')
const studentsCourses = require('./mainModels/studentsCourses')
const instructorsCourses = require('./mainModels/instructorsCourses')
const departments = require('./mainModels/departments');
const coursesRouter = require('../routes/coursesRouter');


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
const studentsCoursesModel = studentsCourses(sequelize,DataTypes)
const instructorsCoursesModel = instructorsCourses(sequelize,DataTypes)
const departmentsModel = departments(sequelize,DataTypes)

// students courses relation
coursesModel.belongsToMany(usersModel,{through:studentsCoursesModel,as:'students'})
usersModel.belongsToMany(coursesModel,{through:studentsCoursesModel})

// instructor courses relation
coursesModel.belongsToMany(usersModel,{
    through:instructorsCoursesModel,
    as:'instructors'
})
usersModel.belongsToMany(coursesModel,{
    through:instructorsCoursesModel
})

// depatrment courses relation
coursesModel.belongsTo(departmentsModel,{
    foreignKey:'departmentId',
    as:'departments'
})
// departmentsModel.hasMany(coursesModel)

// institutions courses relation 
coursesModel.belongsTo(usersModel,{
    foreignKey:'institutionId',
    as:'institution'
})
// usersModel.hasMany(coursesModel)

// departments departmentHead relation
departmentsModel.belongsTo(usersModel,{
    foreignKey:'departmentHeadId',
    as:'departmentHead'
})
// usersModel.hasMany(departmentsModel)

//departments instituations relations
departmentsModel.belongsTo(usersModel,{
    foreignKey:'institutionId',
    as:'institution'
})

//students institutions relations
usersModel.belongsTo(usersModel,{
    foreignKey:'institutionId',
    as:'institution'
})

//students departments relations
usersModel.belongsTo(departmentsModel)




module.exports = {
    db:sequelize,
    usersModel,
    coursesModel,
    studentsCoursesModel,
    instructorsCoursesModel,
    departmentsModel

}
