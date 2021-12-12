import Maintenance from "../models/maintenanceModel.js";
import asyncHandler from "express-async-handler"

const addMaintenance= asyncHandler(async(req,res)=>{
    const data=req.body
    let maintenance= new Maintenance(data)
     maintenance=await maintenance.save()
    res.status(201).json(maintenance);
})


const maintenanceList= asyncHandler(async(req,res)=>{
    const pageSize=10;
    const page = Number(req.query.page) || 1

    const count= await Maintenance.countDocuments({bus:req.params.id})
    const maintenance=await Maintenance.find({bus:req.params.id})
    .limit(pageSize)
    .skip(pageSize*(page-1))


    res.json({ maintenance, page, pages: Math.ceil(count / pageSize) })

})

const deleteMaintenance=asyncHandler(async(req,res)=>{
    const maintenance=await Maintenance.findById(req.params.id)
    if(maintenance)
    {
        await maintenance.remove()
        res.json({message:'Record removed'})
    }else{
        res.status(404)
        throw new Error('Record not found')
    }
})

const getMaintenance=asyncHandler(async(req,res)=>{
    console.log("hi")
    const id=req.params.id
    const maintenance= await Maintenance.findById(id);

    if(maintenance)
    {
        res.json(maintenance)
    }else{
        res.status(404);
        throw new Error('Record Not found')
    }
})

export {addMaintenance,deleteMaintenance,getMaintenance,maintenanceList}
