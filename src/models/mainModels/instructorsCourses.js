const instructorsCourses = (Sequelize,DataTypes)=> 
Sequelize.define('instructorsCourses',{
    courseId:{
        type:DataTypes.INTEGER,
        allowNull:false,   
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }

})
module.exports = instructorsCourses