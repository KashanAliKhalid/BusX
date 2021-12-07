import asyncHandler from "express-async-handler"
import SuperAdmin from "../../models/superAdminModel.js";
import generateToken from "../../utils/generateToken.js";
import nodemailer from 'nodemailer'
import jwt from "jsonwebtoken";

const authSuperAdmin= asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const user=await SuperAdmin.findOne({email})

    if(user && await user.matchPassword(password)) {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
            type:'SuperAdmin',
        })
    } else{
        res.status(404)
        throw new Error('invalid email or password')

    }

})


const addSuperAdmin=asyncHandler(async(req,res)=>{
    const data=req.body;

    let superAdmin= new SuperAdmin(data)
    superAdmin= await superAdmin.save();

    res.status(201).json(superAdmin);
})

export {authSuperAdmin,addSuperAdmin}
