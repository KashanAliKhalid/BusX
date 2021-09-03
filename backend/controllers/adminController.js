import asyncHandler from "express-async-handler"
import Admin from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";


const authAdmin= asyncHandler(async(req,res)=>{
const {email,password}=req.body

    const user=await Admin.findOne({email})

    if(user && await user.matchPassword(password)) {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
            type:'Admin',
            instituteLocation:user.instituteLocation
        })
    } else{
        res.status(404)
        throw new Error('invalid email or password')


    }

})

const getAdminProfile= asyncHandler(async(req,res)=>{
const admin=await Admin.findById(req.admin._id)
    if(admin)
    {
        res.json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
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


export {authAdmin,addAdmin,getAdminProfile}
