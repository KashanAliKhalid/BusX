import mongoose from 'mongoose'

const maintainanceSchema=mongoose.Schema({
    receipt:{
        type:Buffer,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    maintenanceDate:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    bus:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bus',
        default:null
    }
},{timeStamps:true})


const Maintenance=mongoose.model('Maintenance',maintainanceSchema)
export default Maintenance
