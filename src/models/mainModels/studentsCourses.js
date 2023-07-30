const studentsCourses = (Sequelize,DataTypes)=> 
Sequelize.define('studentsCourses',{
    courseId:{
        type:DataTypes.INTEGER,
        allowNull:false,   
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }

})
module.exports = studentsCourses