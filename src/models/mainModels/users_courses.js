const users_courses = (Sequelize,DataTypes)=> 
Sequelize.define('users_courses',{
    courseId:{
        type:DataTypes.INTEGER,
        allowNull:false,   
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }

})
module.exports = users_courses