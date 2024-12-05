const connection = require("../config/connection");
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')

const verifyAdmin = async (req, resp, next) => {
    try { 
        let status;
        const token= req.cookies.token;
      
        if(!token)
        {
            return next({status:401, message:"Token is expired"});
        }
        else{
        jwt.verify(token, process.env.JWT_SECRETKEY, (err,data)=>{
            if(err)
            {
                return next({status:401, message:"token is invalid"});
            }
            else{
                status= data.username;
            }
        })
            
        const db= await connection();
            const [rows, field]=  await db.query('select roleid from data where email=?', [status]);
           
            if(rows[0].roleid === 1)
            {
                console.log('welcome admin');
                next();
               
            }
            else{
                return resp.send('you are not admin');
            }
        
        
        }

    } catch (err) {
        console.error(err);
        return resp.status(500).json({ message: "Server error" });
    }
};

module.exports = { verifyAdmin };