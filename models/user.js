const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const config=require('../config/db');


const UserSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        require:true
    },
    login:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

});

const User=module.exports=mongoose.model('User',UserSchema);

module.exports.getUserByLogin=function(login,callback){
    const query={login:login};
    User.findOne(query,callback);
};

module.exports.getUserById=function(id,callback){
    User.findById(id,callback);
};

module.exports.addUser=function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            else{
                newUser.password=hash;
                newUser.save(callback);
            }
            
        });

    });   
};

module.exports.comparePass=function(passFromUser,userDBPass,callback){
    bcrypt.compare(passFromUser,userDBPass,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    });
};

