var {PythonShell} = require('python-shell');


exports.predict=async (req,res)=>{

  try{
    var options = {

      pythonOptions: ['-u'],
      args: req.body.inputt
    };

    PythonShell.run('D:/FYP/EW updated 2/controller/prediction model/predict.py', options, function (err, results) {
      if (err)
        throw err;

      console.log(results[0]);price:results[0]
      res.json({success:true})
    });
}
catch(err){
  res.json({ message: error.message,success:false });
}

}
