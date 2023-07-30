const courses = (Sequelize,DataTypes)=> 
Sequelize.define('courses',{
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    departmentId:{
        type: DataTypes.INTEGER,
    },
    institutionId:{
        type: DataTypes.INTEGER,
    },
    start_date: {
        type: DataTypes.DATE,
    },
    end_date: {
        type: DataTypes.DATE,
    },

})
module.exports = courses