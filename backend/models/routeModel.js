import mongoose from 'mongoose'

const routeSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    stops:[
        {
            latitude:{
                type:Number
            },
            longitude:{
                type:Number
            }
        }
    ]
})
