import jwt from'jsonwebtoken';
import  bcrypt from 'bcryptjs';
import users from '../models/auth.js';
import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

//signup
export const signup  = async (req,res) => { 
  const {name,email,password} = req.body;
  console.log(req.body);
  try{
     
    const existUser =  await users.findOne({ email });
    if(existUser) {
      console.log(existUser);
      return res.status(400).json({message:"email is already regsitered"});
      }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({name,email,password:hashedPassword})
    const token = jwt.sign({email:newUser.email, id:newUser._id}, process.env.JWT_SECRET ,{expiresIn:"1h"});
    return res.status(201).json({result:newUser,token})

  }catch(error){
    console.log(error);
    return res.status(500).json({message:"something wrong"});
  }
}


//login
export const login  = async (req,res) => {
    const {email,password} = req.body;
    console.log(req.body);

    try{
         const existUser =  await users.findOne({email});
        if(!existUser) {
          return  res.status(404).json({ message:"invalid credentials..."});
        }
    
        const isPw = await bcrypt.compare(password, existUser.password);
        console.log(isPw);
        if(!isPw){
           return res.status(404).json({message:"Not matched your password.."});
           
        }
        const token = jwt.sign({email:existUser.email ,id:existUser._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        return res.status(200).json({result:existUser,token})
    
      }catch(error){
        console.log(error);
        return res.status(500).json({message:"something wrong"});
    }
}

//forgetpw
export const forgetPw = async (req,res) => {
  const {email} = req.body;
  try {
   const oldUser = await users.findOne({email});
   if(!oldUser) {
    return res.status(400).json({status:"User Not Exist"})
   }
   const secret = 'test'+ oldUser.password;
   const token  = jwt.sign({email:oldUser.email,id:oldUser._id},secret,{
    expiresIn:'2h',
   })
   const link = `http://localhost:8000/user/reset-password/${oldUser._id}/${token}`;
   let transporter = nodemailer.createTransport({
    host: 'localhost',
    service: "gmail",
    port: 465,
    secure: true,
    secureConnection: false,
    auth: {
      user: 'rajkumarprjpm@gmail.com',
      pass: 'czdvkthkbzqqgheq'
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
// @ ----------- NodeMailer --------------
var mailOptions = {
    from:"rajkumarprjpm@gmail.com",
    to: email,
    subject: "Reset password",
    text: `This is reset password link, Your click this ${link}`,
  };

  transporter
    .sendMail(mailOptions)
    .then((response) => {
      res.status(200).json({ Successfull:response});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Something went wrong... Internal Server Error");
    });


  } catch (error) {
    console.log(error)
  }
}

export const resetPw = async (req,res) =>{
  const{id,token} = req.params;
  console.log(req.params)

  const oldUser = await users.findOne({_id:id});
  if(!oldUser){
    return res.json({status:"user not exists!"})
  }
  const secret = 'test'+ oldUser.password;
  try {
    const verify = jwt.verify(token,secret)
   res.render('index',{email:verify.email,status:"not verified"})

  } catch (error) {
    console.log(error)
    res.send("not verify")
  }
}

export const reset = async (req,res) =>{
  const{id,token} = req.params;
  const { password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.json({ status: "Passwords do not match!" });
  }
  console.log(password)
  const oldUser = await users.findOne({_id:id});
  if(!oldUser){
    return res.json({status:"user not exists!"})
  }
  const secret = 'test'+ oldUser.password;
  try {
    const verify = jwt.verify(token,secret);
    const hashPw = await bcrypt.hash(password, 10);
    await users.updateOne({
      _id:id,
    },
    {
      $set :{
        password:hashPw,
      },
    }
    );
   res.render('index',{email:verify.email,status:"verified"})
  } catch (error) {
    console.log(error)
  }
}