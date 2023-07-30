
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
        allowNull:false
        },
        birth_date:{
        type: DataTypes.DATE,
        allowNull:false
        },
        role:{
        type: DataTypes.ENUM('admin','teacher','student'),
        defaultValue:'student'
    },
        capabilities:{
        type:DataTypes.VIRTUAL,
        get(){
            const acl = {
                admin:['read','update','create','delete','updateAsSchool','createAsSchool','deleteAsSchool','updateAsTeacher','createAsTeacher','deleteAsTeacher'],
                // school:['read','updateAsSchool','createAsSchool','deleteAsSchool'],
                teacher:['read','updateAsTeacher','createAsTeacher','deleteAsTeacher'],
                student:['read']
            }
            return acl[this.role]
        }
    },
    token:{
        type:DataTypes.VIRTUAL
    }

})

module.exports = users