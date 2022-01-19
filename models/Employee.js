// step 1: create a model to be used in saving an Employee

let mongoose =require("mongoose")
let validator = require ("validator")
// import {isEmail} from 'validator'
let schema =mongoose.Schema({
    first_name:{type:String, required:[true, "Enter your first name"],
    validate: [validator.isAlphanumeric, 'Please enter only numbers and letters']
    },
    last_name:{type:String, required:[true, "Enter your last name"]},
    surname:{type:String, required:[true, "Enter your Surname"]},
    phone:{type:String, required:[true, "Enter your phone"],
        minlength:[13, "Must be 13 characters"],maxlength:[13,"maximum 13 characters"]},
    gender:{type:String, required:[true, "Enter your Gender"], 
    enum:['Male','Female']},
    residence:{type:String, required:[true, "Enter your Residence"]},
    id_number:{type:String, required:[true, "Enter your id_number"],
        validate:{
            validator:function(v){
                // id with XX-XXX
                return (/\d{2}-\d{4}/.test(v));
            }
        }
    },
    department:{type:String, required:[true, "Enter your department name"]},
    qualification:{type:String, required:[true, "Enter your qualification "]},
    email:{type:String, required:[true, "Enter your Email "],
        validate: [validator.isEmail, 'Please enter a valid email']
    },
},
{
    collection:'employees'
});
module.exports = mongoose.model("Employee", schema)