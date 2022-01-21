// step 2: We create our routes / post/ get/ update and delete
const express = require("express");
const { object } = require("webidl-conversions");
const { distinct } = require("./models/Employee");
const Employee = require("./models/Employee") // access our model

//create a router
const router = express.Router()

// add employee
router.post("/add", async(req, res) => {
    const post = new Employee({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        surname:req.body.surname,
        phone:req.body.phone,
        gender:req.body.gender,
        residence:req.body.residence,
        id_number:req.body.id_number,
        department:req.body.department,
        qualification:req.body.qualification,
        email:req.body.email

    });
    try{
        const result = await post.save();
        res.status(200).json({'message':'Employee Registered'})
    }
    catch(err){
        if(err.name === "ValidationError"){
            let errors = {};
            Object.keys(err.errors).forEach((key)=>{
                errors[key] =err.errors[key].message
            });
            return res.status(400).send(errors);
        }//end
        else{
            res.status(200).json({'error':'Error Occurred, Try again'})
        }
        // res.status(400).json({'message':err.message})
    }
});//END

router.get('/employees', function(req,res)
{
    Employee.find({}, function(err,data){
        if(err){
            res.status(404).json({'message':'There was an error'})
        }
        else{
            res.status(200).send(data)
        }
    })
});
router.post("/findbyfname", function(req, res)
{
    Employee.find({first_name:req.body.first_name},
        function(error, data)
    {
        if (error){
            res.status(300).json({"msg":error.message})
        }
        else{
            if(data.length ==0){
                res.status(200).json({"msg":"Not Found"})
            }
            else{
            res.status(200).json(data)
            }
        }
    });

});

router.route('/deletebyphone').post( function(req, res)
{
    Employee.remove({phone:req.body.phone},
        function(err, result)
    {
        if (err){
            res.send(err)
        }
        
        else{
        res.send({"msg":"Removed!"})
        }
        
    })

});

router.route('/updatebyresidence').post( function(req, res)
{
    Employee.findByIdAndUpdate({residence:req.body.residence},
        function(err, result)
    {
        if (err){
            res.send(err)
        }
        
        else{
        res.send({"msg":"updated!"})
        }
        
    })
});

router.route('/employees/:id').delete((req,res) =>
{
    Employee.findByIdAndDelete(req.params.id, (error,data)=>
    {
        if (error){
            res.status(200).json({'message':"Delete Failed"})
        }
        else{
            res.status(200).json({'message':"Deleted"})
        }
    })
});

// route to post and find by phone
// route to delete by _id or first_name

router.route('/employees/:id').get((req,res) =>
{
    Employee.findById(req.params.id, (error,data)=>
    {
        if (error){
            if (data==null){
                res.status(404).json({'message':"Employee not found"})
            }
            else{
                res.status(400).json({'message':"There was an error"})
            }
        }
        else{
            if(data==null){
                res.status(404).json({'message':"Employee Not Found"})
            }
            else{
                res.status(200).json(data)
            }
            
        }

    })

});
// update someone by residence id

router.route('/employees/:id').put((req,res) =>
{
    Employee.findByIdAndUpdate(req.params.id,{$set:{department:req.body.department}}, (error,data)=>
    {
        if (error){
            res.status(200).json({'message':"Update Failed"})
        }
        else{
            res.status(200).json({'message':"Updated Employee"})
        }
    })
});

// create a route
router.route('/countEmployees').get(function(req,res)
{
    Employee.count({},function(err,result)
    {
        if (err){
            res.send(err)
        }
        else{
            res.json({'count':result, 'name':'Employees'})
        }
    });
});

// count departments
router.route('/countDepartments').get(function(req,res)
{
    Employee.find().distinct('department',function(err,result)
    {
        if (err){
            res.send(err)
        }
        else{
            res.json({'count':result.length, 'name':'Departments'})
        }
    });
});



module.exports = router;