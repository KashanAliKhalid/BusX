import asyncHandler from "express-async-handler"
import Student from "../models/studentModel.js";


const addStudent= asyncHandler(async(req,res)=>{
    const data=req.body
    const student= new Student(data)
    const createdStudent=await student.save()
    res.status(201).json(createdStudent);
})

const studentList= asyncHandler(async(req,res)=>{
    const pageSize=10;
    const page = Number(req.query.page) || 1
    const keyword = req.query.search
        ? {
            firstName: {
                $regex: req.query.search,
                $options: 'i',
            },
        }
        : {}

    const count= await Student.countDocuments({...keyword})
    const students=await Student.find({...keyword})
    .limit(pageSize)
    .skip(pageSize*(page-1))

    res.json({ students, page, pages: Math.ceil(count / pageSize) })

})

export {addStudent, studentList}

