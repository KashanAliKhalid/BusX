import asyncHandler from "express-async-handler";
import Complaint from "../models/complaintModel.js";

const complaintList= asyncHandler(async(req,res)=>{
    const pageSize=10;
    const page = Number(req.query.page) || 1

    const count= await Complaint.countDocuments({institute:`${req.admin.institute}`})
    const complaints=await Complaint.find({institute:`${req.admin.institute}`})
    .limit(pageSize)
    .skip(pageSize*(page-1))

    res.json({ complaints, page, pages: Math.ceil(count / pageSize) })

})

const allComplaints= asyncHandler(async(req,res)=>{

    const complaints=await Complaint.find({institute:`${req.admin.institute}`})

    res.json({complaints})

})

export {complaintList,allComplaints}
