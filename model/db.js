import mongoose from "mongoose"
const setup = async()=>{
    try{
    await mongoose.connect("mongodb://localhost:27017/student_db")
    console.log("mongoose connected")
   
 
    }
    catch(err){
        console.error(err)
    }
}

export default setup