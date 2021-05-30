import asyncHandler from "express-async-handler"
import Bus from "../models/busModel.js";

const addBus= asyncHandler(async (req,res)=>{
    const data=req.body
    const bus = new Bus(data)
    const createdBus=bus.save()
    res.status(201).json(createdBus)
})


const busList= asyncHandler(async(req,res)=>{
    const pageSize=10;
    const page = Number(req.query.page) || 1
    const keyword = req.query.search
        ? {
            registrationNumber: {
                $regex: req.query.search,
                $options: 'i',
            },
        }
        : {}

    const count= await Bus.countDocuments({...keyword})
    const buses=await Bus.find({...keyword})
    .limit(pageSize)
    .skip(pageSize*(page-1))

    res.json({ buses, page, pages: Math.ceil(count / pageSize) })

})

const deleteBus= asyncHandler(async(req,res)=>{
    const student=await Bus.findById(req.params.id)
    if(student)
    {
        await Bus.remove()
        res.json({message:'Student removed'})
    }else{
        res.status(404)
        throw new Error('Student not found')
    }
})


const getBus=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const bus= await Bus.findById(id);

    if(bus)
    {
        res.json(bus)
    }else{
        res.status(404);
        throw new Error('Student Not found')
    }
})

export {addBus,busList,deleteBus, getBus}
