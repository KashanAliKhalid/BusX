import mongoose from 'mongoose'

const routeSchema=mongoose.Schema({
    name:{
        type:Number,
        required:true
    },
    stops:[
        {
            latitude:{
                type:String
            },
            longitude:{
                type:String
            }
        }
    ]
})

const Route =mongoose.model('Route', routeSchema)
export default Route;
