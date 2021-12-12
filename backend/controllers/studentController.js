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
            institute:`${req.admin.institute}`
        }
        : {institute:`${req.admin.institute}`}

    const count= await Student.countDocuments({...keyword})
    const students=await Student.find({...keyword})
    .limit(pageSize)
    .skip(pageSize*(page-1))

    res.json({ students, page, pages: Math.ceil(count / pageSize) })

})


const deleteStudent=asyncHandler(async(req,res)=>{
    const student=await Student.findById(req.params.id)
    if(student)
    {
        await student.remove()
        res.json({message:'Student removed'})
    }else{
        res.status(404)
        throw new Error('Student not found')
    }
})

const getStudent=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const student= await Student.findById(id);

    if(student)
    {
        res.json(student)
    }else{
        res.status(404);
        throw new Error('Student Not found')
    }
})

const updateStudent=asyncHandler(async (req,res)=>{
    const student= await Student.findById(req.params.id)

    if(student){
         student.lastName= req.body.lastName || student.lastName;
         student.firstName=req.body.firstName || student.firstName;
         student.city=req.body.city || student.city
         student.country=req.body.country || student.country;
         student.address= req.body.address||student.address;
         student.rfid=req.body.rfid || student.rfid;
         student.cnic= req.body.cnic || student.cnic;
         student.postalCode= req.body.postalCode ||student.postalCode
         student.contact= req.body.contact || student.contact
         student.regNo= req.body.regNo || student.regNo
         student.photo=req.body.photo || student.photo
         student.photoType= req.body.photoType || student.photoType
        student.feeStatus=req.body.feeStatus|| student.feeStatus

         if(req.body.password!=='')
         {
             student.password=req.body.password
         }
         const updatedStudent=await student.save()
         res.json(updatedStudent)
     }
     else{
         res.status(404);
         throw new Error('Student not found')
     }


})


const studentCount=asyncHandler (async(req,res)=>{
    const count= await Student.countDocuments({institute:`${req.admin.institute}`})
    res.json({count})
})

const allStudents=asyncHandler (async(req,res)=>{
    const students= await Student.find({institute:`${req.admin.institute}`})
    res.json({students})
})



export {addStudent, studentList,deleteStudent, getStudent,updateStudent,studentCount,allStudents}

