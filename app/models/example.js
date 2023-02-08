const mongoose = require("mongoose")
const exampleSchema = new mongoose.Schema({
    title:{
        type:String
    }
},{timestamps:true})

const Example = mongoose.model("Example",exampleSchema)
module.exports={Example}