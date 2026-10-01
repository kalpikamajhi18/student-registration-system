
import mongoose from "mongoose";
import setup from "./db.js";

setup()
 const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    contact: {type: String, required: true},
    age: {type: Number, required: true, min: 18},
    city: {type: String, required: true},
    gender: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})
const usermodel = await mongoose.model("model", userSchema)

export default usermodel;