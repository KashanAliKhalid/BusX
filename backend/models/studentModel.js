import mongoose from 'mongoose'

const studentSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
            },
    password:{
      type:String,
      required:true,
      default:'12345',

    },
    route:{
        route:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Route'
        }
    },
    bus:{
        bus:{
          type:mongoose.Schema.Types.ObjectId,
            ref:'Bus'
        }
    },
    cnic:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    rfid:{
        type:Number,
        required:true
    },
    image:{
       type:String,
        required:true
    },
    registration:{
        type:String,
        required:true
    },
    nearbyAlert:{
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    },
    stop:{
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    }





},{timeStamps:true})

const Student=mongoose.model('Student', studentSchema)

export default Student
