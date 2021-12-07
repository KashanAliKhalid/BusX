import asyncHandler from "express-async-handler"
import License from "../../models/licenseModel.js";

const addLicense= asyncHandler(async(req,res)=>{
    const data=req.body
    const license= new License(data)
    const createdLicense=await license.save()
    res.status(201).json(createdLicense);
})

const licenseList= asyncHandler(async(req,res)=>{
    const pageSize=10;
    const page = Number(req.query.page) || 1
    const keyword = req.query.search
        ? {
            institute: {
                $regex: req.query.search,
                $options: 'i',
            },
        }
        : {}

    const count= await License.countDocuments({...keyword})
    const licenses=await License.find({...keyword})
    .limit(pageSize)
    .skip(pageSize*(page-1))

    res.json({ licenses, page, pages: Math.ceil(count / pageSize) })

})

const deleteLicense=asyncHandler(async(req,res)=>{
    const license=await License.findById(req.params.id)
    if(license)
    {
        await license.remove()
        res.json({message:'License removed'})
    }else{
        res.status(404)
        throw new Error('License not found')
    }
})

const getLicense=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const license= await License.findById(id);

    if(license)
    {
        res.json(license)
    }else{
        res.status(404);
        throw new Error('License Not found')
    }
})

const licenseCount=asyncHandler (async(req,res)=>{
    const count= await License.countDocuments({})
    res.json({count})
})

const updateLicense=asyncHandler(async (req,res)=>{
    const license= await License.findById(req.params.id)
    const data=req.body

    if(license){
        license.institute= data.license || license.institute
        license.paymentDate=data.paymentDate || license.paymentDate
        license.type=data.type || license.type
        license.address=data.address || license.address
        license.licenseDate=data.licenseDate || license.license
        license.status=data.status||license.status


        const updatedLicense=await license.save()
        res.json(updatedLicense)
    }
    else{
        res.status(404);
        throw new Error('License not found')
    }


})


const allLicenses= asyncHandler(async(req,res)=>{
    const licenses=await License.find()
    res.json({ licenses })
})


export {addLicense, licenseList,deleteLicense, getLicense,updateLicense,licenseCount,allLicenses}
