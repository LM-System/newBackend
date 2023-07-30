
const users = (Sequelize,DataTypes)=>
Sequelize.define('users',{
        username:{
            type: DataTypes.STRING,
            allowNull:false, 
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        gender:{
            type: DataTypes.ENUM('male','female'),
            allowNull:true
        },
        birth_date:{
            type: DataTypes.DATE,
            allowNull:true
        },
        role:{
             type: DataTypes.ENUM('admin','institution','instructor','student','departmentHead'),
            defaultValue:'student'
        },
        institutionId:{
            type: DataTypes.INTEGER,
        },
        departmentId:{
            type: DataTypes.INTEGER,
        },
         token:{
            type:DataTypes.VIRTUAL
        }

})

module.exports = users