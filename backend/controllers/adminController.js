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
            institute:user.institute,
            instituteLocation:user.instituteLocation
        })
    } else{
        res.status(404)
        throw new Error('invalid email or password')


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
    console.log(data.institute)
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



export {authAdmin,addAdmin,getAdminProfile,updateAdmin}
