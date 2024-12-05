const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../config/connection");

async function LoginUser(req, resp, next) {
  const { email, password } = req.body;
  const conn = await connection();

  const [field] = await conn.query(
    "SELECT password FROM data WHERE email = ?",
    [email]
  );

  if (!field || !field[0]) {
    return resp.status(400).send("User not found");
  }

  const match = await bcrypt.compare(password, field[0].password);

  if (!match)
  {
    return resp.send('incorrect password');
  }   
    
  else{
    const token = req.cookies.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRETKEY, (err, data) => {
        if (err) {
          return next({ status: 401, message: "unauthorized" });
        }
      });
    } else if (!token) {
      const token = jwt.sign({ username: email }, process.env.JWT_SECRETKEY, {
        expiresIn: "1hr",
      });

      resp.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      return resp.status(200).send("Login successful");
    } else {
      return resp.status(400).send("The password does not match");
    }
  }
}

async function logOutUser(req, resp, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return resp.status(404).json({ message: "Token is not verified" });
    }

    resp
      .clearCookie("token")
      .status(200)
      .json({ message: "Signed out successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { logOutUser, LoginUser };
