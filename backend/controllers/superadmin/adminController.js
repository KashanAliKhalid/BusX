import asyncHandler from "express-async-handler"
import Admin from "../../models/adminModel.js";

const addAdmin= asyncHandler(async(req,res)=>{
    const data=req.body
    const admin= new Admin(data)
    const createdLicense=await admin.save()
    res.status(201).json(createdLicense);
})


const adminList= asyncHandler(async(req,res)=>{
    const pageSize=10;
    const page = Number(req.query.page) || 1
    const keyword = req.query.search
        ? {
            name: {
                $regex: req.query.search,
                $options: 'i',
            },
        }
        : {}

    const count= await Admin.countDocuments({...keyword})
    const admins=await Admin.find({...keyword})
    .limit(pageSize)
    .skip(pageSize*(page-1))

    res.json({ admins, page, pages: Math.ceil(count / pageSize) })

})


const deleteAdmin=asyncHandler(async(req,res)=>{
    const admin=await Admin.findById(req.params.id)
    if(Admin)
    {
        await admin.remove()
        res.json({message:'Admin removed'})
    }else{
        res.status(404)
        throw new Error('Admin not found')
    }
})

const getAdmin=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const admin= await Admin.findById(id);

    if(admin)
    {
        res.json(admin)
    }else{
        res.status(404);
        throw new Error('License Not found')
    }
})

const adminCount=asyncHandler (async(req,res)=>{
    const count= await Admin.countDocuments({})
    res.json({count})
})

const updateAdmin=asyncHandler(async (req,res)=>{
    const admin= await Admin.findById(req.params.id)
    const data=req.body

    if(admin){
        admin.institute= data.institute || admin.institute
        admin.name=data.name || admin.name
        admin.email=data.email || admin.email
        admin.instituteLocation=data.instituteLocation || admin.instituteLocation

        if(data.password)
        {
        admin.password=data.password
        }


        const updatedAdmin=await admin.save()
        res.json(updatedAdmin)
    }
    else{
        res.status(404);
        throw new Error('Admin not found')
    }


})



export {addAdmin,deleteAdmin,updateAdmin,getAdmin,adminList,adminCount}
