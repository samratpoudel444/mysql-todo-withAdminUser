const connection = require("../config/connection");
const {v4: uuidv4}= require('uuid');
const bcrypt= require('bcrypt');
const showusers = async (req, res) => {
    try {
        const conn= await connection();
        const [rows] = await conn.query('SELECT id, email, password FROM  DATA WHERE roleid = ? ',[2]);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

const createusers = async (req, res) => {
    try {
        const id= uuidv4();
        const { email, password,} = req.body; 
        const pass= await bcrypt.hash(password ,10 );
        console.log(pass);
        const conn= await connection();
        const [result] = await conn.query('INSERT INTO data (id, email, password, roleid ) VALUES (?, ?, ?, ?)', [id, email, pass, '2']);

       
        res.status(201).json({ message: "User created successfully" });
    } catch (err) 
    {
        console.log(err);
        res.status(500).send( err.message );
    }
};

const deleteuser = async (req, res) => {
    try {
        const { email } = req.body;  
        const conn= await connection();
        const [result] = await conn.query('DELETE FROM data WHERE email = ?', [email]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete user" });
    }
};

const updateuser = async (req, res) => {
    try {
        const { email, password } = req.body;  
        const conn= await connection();
        const [result] = await conn.query('UPDATE data SET password = ? WHERE email = ?', [password, email]);

    
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update user" });
    }
};

module.exports = { createusers, showusers, deleteuser, updateuser };
