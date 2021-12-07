import asyncHandler from "express-async-handler"
import Payment from "../../models/paymentModel.js";

const addPayment= asyncHandler(async(req,res)=>{
    const data=req.body
    const payment= new Payment(data)
    const createdPayment=await payment.save()
    res.status(201).json(createdPayment);
})


const paymentList= asyncHandler(async(req,res)=>{
    const pageSize=10;
    const page = Number(req.query.page) || 1


    const count= await Payment.countDocuments()
    const payments=await Payment.find({})
    .limit(pageSize)
    .skip(pageSize*(page-1))

    res.json({ payments, page, pages: Math.ceil(count / pageSize) })

})

const deletePayment=asyncHandler(async(req,res)=>{
    const license=await Payment.findById(req.params.id)
    if(license)
    {
        await license.remove()
        res.json({message:'Payment removed'})
    }else{
        res.status(404)
        throw new Error('Payment not found')
    }
})

const getPayment=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const payment= await Payment.findById(id);

    if(payment)
    {
        res.json(payment)
    }else{
        res.status(404);
        throw new Error('License Not found')
    }
})

const updatePayment=asyncHandler(async (req,res)=>{
    const payment= await Payment.findById(req.params.id)
    const data=req.body

    if(payment){
        payment.institute= data.license || payment.institute
        payment.paymentDate=data.paymentDate || payment.paymentDate
        payment.type=data.type || payment.type
        payment.address=data.address || payment.address
        payment.licenseDate=data.licenseDate || payment.license
        payment.status=data.status||payment.status


        const updatedPayment=await payment.save()
        res.json(updatedPayment)
    }
    else{
        res.status(404);
        throw new Error('Payment not found')
    }


})

export {addPayment,updatePayment,deletePayment,paymentList,getPayment}
