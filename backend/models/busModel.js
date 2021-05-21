import mongoose from 'mongoose'

const busSchema=mongoose.Schema({
    name:{
        type:Number,
        required:true
    },
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Driver',

    },
    model:{
        type:String,
        required:true
    },
    manufacturer:{
      type:String,
      required:true,
    },
    purchaseDate:{
      type:String,
      required:true
    },
    nextService:{
      type:Date,
      required:true
    },
    repairHistory:[
        {
            repairType:{
                type:String,
            },
            cost:{
                type:Number,
            },
            Date:{
                type:Number,
            },
            receipt:{
                type:String,
            }
        }
    ],
    driverHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Driver',
        }
    ],
    registrationNumber:{
        type:Number,
        required:true
    },
    registrationCard:{
        type:String,
        required:true
    },
    fitnessReport:{
        type:String,
        required:true
    },
    complaint:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Complaint'
    },
    location:{
        latitude:{
            type:String
        },
        longitude:{
            type:String
        }
    }
})

const Bus=mongoose.model('Bus',busSchema)
export default Bus
