const express= require('express');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const connection = require('../config/connection');

async function LoginUser(req, resp, next) 
{
    const{email, password}= req.body;
    const conn= await connection();

    const [field]= await conn.query('select password from data where email =? ', [email]);
  
   const match= bcrypt.compare(field[0].password, password);
   const token = jwt.sign({username: email}, process.env.JWT_SECRETKEY, {expiresIn: '1hr'})

   if(match)
   {

    console.log('the password is match');
    resp.cookie('token' , email, {
        httpOnly: true,  
        maxAge: 60 * 60 * 24 * 7 * 1000,  
        
    });

   }
   else
   {
    return resp.send('the password is nott match');
   }

    
}

module.exports= LoginUser;