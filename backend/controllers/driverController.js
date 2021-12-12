import asyncHandler from "express-async-handler"
import Driver from "../models/driverModel.js";


const addDriver= asyncHandler(async(req,res)=>{
    const data=req.body
    const driver= new Driver(data)
    const createdStudent=await driver.save()
    res.status(201).json(createdStudent);
})


const driverList= asyncHandler(async(req,res)=>{
    const pageSize=10;
    const page = Number(req.query.page) || 1
    const keyword = req.query.search
        ? {
            firstName: {
                $regex: req.query.search,
                $options: 'i',
            },
            institute:`${req.admin.institute}`
        }
        : {institute:`${req.admin.institute}`}

    const count= await Driver.countDocuments({...keyword})
    const drivers=await Driver.find({...keyword})
    .limit(pageSize)
    .skip(pageSize*(page-1))

    res.json({ drivers, page, pages: Math.ceil(count / pageSize) })

})

const allDrivers= asyncHandler(async(req,res)=>{
    const drivers=await Driver.find({institute:`${req.admin.institute}`})
    res.json({ drivers })
})

const deleteDriver=asyncHandler(async(req,res)=>{
    const driver=await Driver.findById(req.params.id)
    if(driver)
    {
        await driver.remove()
        res.json({message:'Driver removed'})
    }else{
        res.status(404)
        throw new Error('Driver not found')
    }
})


const getDriver=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const driver= await Driver.findById(id);

    if(driver)
    {
        res.json(driver)
    }else{
        res.status(404);
        throw new Error('Student Not found')
    }
})

const updateDriver=asyncHandler(async (req,res)=>{
    const driver= await Driver.findById(req.params.id)
    console.log(req.body.password)

    if(driver){
        driver.lastName= req.body.lastName || driver.lastName;
        driver.firstName=req.body.firstName || driver.firstName;
        driver.city=req.body.city || driver.city
        driver.country=req.body.country || driver.country;
        driver.address= req.body.address||driver.address;
        driver.dob=req.body.dob || driver.dob;
        driver.cnic= req.body.cnic || driver.cnic;
        driver.postalCode= req.body.postalCode ||driver.postalCode
        driver.contact= req.body.contact || driver.contact
        driver.age= req.body.age || driver.age
        driver.photo=req.body.photo || driver.photo
        driver.photoType= req.body.photoType || driver.photoType
        driver.license= req.body.license || driver.license

        if(req.body.password!=='' && req.body.password!==null)
        {
            driver.password=req.body.password
        }
        console.log(driver.password)
        const updatedStudent=await driver.save()
        res.json(updatedStudent)
    }
    else{
            res.status(404);
            throw new Error('Student not found')
    }


})

const driverCount=asyncHandler (async(req,res)=>{
    const count= await Driver.countDocuments({institute:`${req.admin.institute}`})
    res.json({count})
})

export { addDriver,deleteDriver,getDriver,driverList,updateDriver,driverCount,allDrivers}
