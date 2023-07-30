const courses = (Sequelize,DataTypes)=> 
Sequelize.define('courses',{
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    instructorId:{
        type: DataTypes.STRING
    },
    start_date: {
        type: DataTypes.DATE,
    },
    end_date: {
        type: DataTypes.DATE,
    },

    

})
module.exports = courses