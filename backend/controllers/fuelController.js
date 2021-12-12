import asyncHandler from "express-async-handler"
import Driver from "../models/driverModel.js";
import {PythonShell} from "python-shell";

const getFuel= asyncHandler(async(req,res)=>{
    try{
        var distances=req.body.inputData;
        console.log(distances)
        var fuels=[]
        let obj={}
        distances.forEach((dist,index)=>{
            let options = {

                pythonOptions: ['-u'],
                args: [dist*0.62]
            };

            PythonShell.run('C:/Users/HP/WebstormProjects/BusX/backend/controllers/fuel management/prediction model/predict.py', options, function (err, results) {
                if (err)
                    throw err;


                console.log(results[0]);
                fuels.push(results[0])
                obj[dist]=results[0]

                if(fuels.length===distances.length)
                {
                    res.json({obj,success:true})
                }

            }
            );



        })

    }
    catch(err){
        res.json({ message: err.message,success:false });
    }
})

export {getFuel}
