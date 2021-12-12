import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const studentSchema= mongoose.Schema({
    firstName:{
        type:String,
        required:true,
            },
    lastName:{
        type:String,
        required:true,
    },

    password:{
      type:String,
      required:true,
      default:'12345',

    },
    route:{
        routeId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Route'
        },
        routeName:{
            type:String
        }
    },
    bus:{
          type:mongoose.Schema.Types.ObjectId,
            ref:'Bus',
            default:null
    },
    address:{
      type:String,
      required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    postalCode:{
        type:Number,
        required:true
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
    photo:{
       type:Buffer,
        required:true,
    },
    photoType:{
      type:String,
      required:true
    },
    regNo:{
        type:String,
        required:true
    },
    nearbyAlert:{
        latitude:{
            type:Number,
            default:0
        },
        longitude:{
            type:Number,
            default:0
        }
    },
    stop:{
        latitude:{
            type:Number,
            default:0
        },
        longitude:{
            type:Number,
            default:0
        }
    },
    feeStatus:{
        type:String,
    },
    attendance:{
        type:String,
        default:"present"
    },
    notificationToken:{
        type:String,
        default: null
    },
    institute:{
        type:String,
        required:true
    },
    forgetPasswordLink:{
        type:String,
    },


},{timeStamps:true})

studentSchema.index({ 'institute': 1, 'cnic': 1}, { unique: true });

studentSchema.pre('save',async function (next){
    const user=this;
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password, 8)
    }
    next()
})

const Student=mongoose.model('Student', studentSchema)

export default Student
