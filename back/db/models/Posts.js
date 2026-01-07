module.exports =(sequelize,DataTypes)=>{
    const  Posts = sequelize.define("Posts",{
        user_id:{
            type:DataTypes.INTEGER, 
            allowNull:false,
            refferences:{
                model:"Users",
                key:"id"
            }
        },
        title:{ 
            type:DataTypes.STRING,
            allowNull:false,
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        date:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        likes:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }


    })
    return Posts
}