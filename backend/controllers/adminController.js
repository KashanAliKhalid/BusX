import asyncHandler from "express-async-handler"
import Admin from "../models/adminModel.js";
import License from "../models/licenseModel.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from 'nodemailer'
import jwt from "jsonwebtoken";


const authAdmin= asyncHandler(async(req,res)=>{
const {email,password}=req.body

    const user=await Admin.findOne({email})


    if(user && await user.matchPassword(password)) {
        const license=await License.findOne({institute:`${user.institute}`})
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
            type:'Admin',
            institute:user.institute,
            instituteLocation:user.instituteLocation,
            license
        })
    } else{
        res.status(404)
        throw new Error('invalid email or password')


    }

})

const forgotPassword=asyncHandler(async (req,res)=>{
    const {email}=req.body;
    const user=await Admin.findOne({email})
    if(user)
    {
        let token=generateToken(user._id);

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            name:"busx",
            auth: {
                user: 'kashanalikhalid@gmail.com',
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        let info = await mailTransporter.sendMail({
            from: 'support@busx.com', // sender address
            to:   `${email}`, // list of receivers
            subject: "Busx password reset", // Subject line
            text: `http://localhost:3000/resetpassword/${token}`, // plain text body
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.json({info})
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }

})

const getAdminProfile= asyncHandler(async(req,res)=>{
let admin=await Admin.findById(req.admin._id)
    if(!admin)
    {
         admin=await Admin.findById(req.params.id)
    }
    if(admin)
    {
        res.json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            instituteLocation:admin.instituteLocation,
            institute:admin.institute,
        })
    } else{
        res.status(404)
        throw new Error('User not found')
    }
})


const addAdmin=asyncHandler(async(req,res)=>{
    const data=req.body;

    let admin= new Admin(data)
    admin= await admin.save();

    res.status(201).json(admin);
})

const updateAdmin=asyncHandler(async(req,res)=>{
    const data=req.body;
    const admin= await Admin.findById(req.params.id)
    if(admin)
    {
        admin.name=data.name||admin.name
        admin.email=data.email||admin.email
        admin.institute=data.institute || admin.institute
        admin.instituteLocation=data.instituteLocation||admin.instituteLocation

        if(req.body.password!=='')
        {
            admin.password=data.password
        }
        const updatedAdmin=await admin.save()
        res.json(updatedAdmin);
    }
    else{
        res.status(404);
        throw new Error('Admin not found')
    }
})


const resetPassword=asyncHandler(async(req,res)=>{
    const {token,password}=req.body;

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        let admin=await Admin.findById(decoded.id).select('-password')
        admin.password=password
        const updatedAdmin=await admin.save()
        res.json(updatedAdmin);

    } catch(error){
        res.status(401)
        throw new Error('Not authorized, token failed')
    }
})





export {authAdmin,addAdmin,getAdminProfile,updateAdmin,forgotPassword,resetPassword}
