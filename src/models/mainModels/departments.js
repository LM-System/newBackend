const departments = (Sequelize,DataTypes)=> 
Sequelize.define('departments',{
    name: {
        type: DataTypes.STRING,
    },
    departmentHeadId: {
        type: DataTypes.INTEGER,
    },
    institutionId:{
        type: DataTypes.INTEGER
    }
    
})
module.exports = departments