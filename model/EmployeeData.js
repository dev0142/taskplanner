const mongoose = require('mongoose');
const EmployeeData = new mongoose.Schema({
    name:{
        type:String,
        requires:true
    },
    number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:"Password"
    },
    type:{
        type:String,
        default:"employee"
    }
})

mongoose.models={};
const employee=mongoose.model('employee',EmployeeData);
module.exports=employee;