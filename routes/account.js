const express=require('express');
const router=express.Router();
const User=require('../models/user');
const passport=require('passport');
const jwt =require('jsonwebtoken');
const config=require('../config/db');



// router.get('/reg',(req,res)=>{
//     res.send('Страница регистрации');
// });

router.post('/reg',(req,res)=>{
    let newUser=new User({
        name:req.body.name,
        email:req.body.email,
        login:req.body.login,
        password:req.body.password
    });
    User.addUser(newUser,(err,user)=>{
        if(err)
            res.json({success:false,msg:"пользователь не был добавлен"});
        else
        res.json({success:true,msg:"Пользователь был добавлен!!!"});
    });

});


// router.get('/auth',(req,res)=>{
//     res.send('Страница авторизации');
// });
router.post('/auth',(req,res)=>{
    const login=req.body.login;
    const password=req.body.password;

    User.getUserByLogin(login,(err,user)=>{
        if(err)throw err;
        if(!user)
            return res.json({success:false,msg:"Такой пользователь был не найден"});

        User.comparePass(password,user.password,(err,isMatch)=>{
            if(err)throw err;
            if(isMatch)
            {
                const token=jwt.sign(user,config.secret,{
                    expiresIn:3600*24
                });

                res.json({
                    success:true,
                    token:'JWT'+token,
                    user:{
                        id:user._id,
                        name:user.name,
                        login:user.login,
                        email:user.email
                    }
                })
            }
            else
            return res.json({success:false,msg:"Пароли не совпадают"});

        })

    });
});

router.get('/dashboard',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.send('Кабинет пользователя');
});

module.exports=router;
