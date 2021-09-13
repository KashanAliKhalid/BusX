import asyncHandler from "express-async-handler"
import Route from '../models/routeModel.js'

const addRoute=asyncHandler(async( req,res)=>{
    const data=req.body
    let route=new Route(data)
     route=await route.save()
    res.status(201).json(route)

})


const routeList= asyncHandler(async(req,res)=>{
    const pageSize=10;
    const page = Number(req.query.page) || 1
    const keyword = req.query.search
        ? {
            name: {
                $regex: req.query.search,
                $options: 'i',
            },
        }
        : {}

    const count= await Route.countDocuments({...keyword})
    const routes=await Route.find({...keyword})
    .limit(pageSize)
    .skip(pageSize*(page-1))

    res.json({ routes, page, pages: Math.ceil(count / pageSize) })

})

const deleteRoute=asyncHandler(async(req,res)=>{
    const route=await Route.findById(req.params.id)
    if(route)
    {
        await route.remove()
        res.json({message:'Route Removed'})
    }else{
        res.status(404)
        throw new Error('Route not found')
    }
})

const getRoute=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const route= await Route.findById(id);

    if(route)
    {
        res.json(route)
    }else{
        res.status(404);
        throw new Error('Route Not found')
    }
})

const updateRoute=asyncHandler(async (req,res)=>{
    const route= await Route.findById(req.params.id)
    const {name,addresses,stops,traveltime,distance}=route;

    if(route){
        route.name=req.body.name || name
        route.addresses=req.body.addresses || addresses
        route.stops=req.body.stops || stops
        route.traveltime=req.body.traveltime || traveltime
        route.distance=req.body.distance || distance


        const updatedRoute=await route.save()
        res.json(updatedRoute)
    }
    else{
        res.status(404);
        throw new Error('Route not found')
    }


})

const routeCount=asyncHandler (async(req,res)=>{
    const count= await Route.countDocuments({})
    res.json({count})
})


export {addRoute,routeList,deleteRoute,updateRoute,routeCount,getRoute}
