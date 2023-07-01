const mongoose = require("mongoose")
const courseUserSchema = new mongoose.Schema({
    course_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    user_course_state:{
        type:String,
        enum: ["enrolled", "banned"],
        default: "enrolled",
    } 
},{timestamps:true})

const CourseUser = mongoose.model("CourseUser",courseUserSchema)
module.exports = CourseUser