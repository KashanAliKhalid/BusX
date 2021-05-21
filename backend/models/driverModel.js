import mongoose from 'mongoose'

const driverSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        default:'12345',

    },
    cnic:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    complaints:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Complaint'
        }
    ],
    fines:[
        {
            reason:{
                type:String,
            },
            location:{
                latitude:{
                    type:Number
                },
                longitude:{
                    type:Number
                }
            },
            amount:{
                type:Number
            },
        }
    ],
    license:{
        type:String,
        required:true
    }
})

const Driver =mongoose.model('Driver',driverSchema)

export default Driver
