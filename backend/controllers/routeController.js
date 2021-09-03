import asyncHandler from "express-async-handler"
import Route from '../models/routeModel.js'

const addRoute=asyncHandler(async( req,res)=>{
    const data=req.body
    let route=new Route(data)
     route=await route.save()
    res.status(201).json(route)

})


export {addRoute}
