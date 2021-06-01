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


const updateBus=asyncHandler(async (req,res)=>{
    const bus= await Bus.findById(req.params.id)

    if(bus){
        bus.busNumber= req.body.busNumber || bus.busNumber;
        bus.registrationNumber=req.body.registrationNumber || bus.registrationNumber;
        bus.photo=req.body.photo || bus.photo
        bus.purchaseDate=req.body.purchaseDate || bus.purchaseDate;
        bus.model= req.body.model||bus.model;
        bus.manufacturer= req.body.manufacturer || bus.manufacturer;
        bus.registrationCard= req.body.registration || bus.registrationCard;
        bus.fitnessReport= req.body.fitnessReport || bus.fitnessReport
        bus.photoType= req.body.photoType || bus.photoType

        const updatedStudent=await bus.save()
        res.json(updatedStudent)
    }
    else{
        res.status(404);
        throw new Error('Bus not found')
    }


})


const busCount=asyncHandler (async(req,res)=>{
    const count= await Bus.countDocuments({})
    res.json({count})
})

export {addBus,busList,deleteBus, getBus,updateBus, busCount}
