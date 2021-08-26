import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    institute:{
        type:String,
        required:true
    }

},{timeStamps:true})

adminSchema.methods.matchPassword=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

adminSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password, 8)
    }
    next()
})

const Admin=mongoose.model('Admin',adminSchema);

export default Admin;
