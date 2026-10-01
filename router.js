import {Router} from "express"

import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import bcrypt from "bcrypt"
import usermodel from "./model/user.js"

const router = Router()

router.get("/",(req,res)=>{
   res.render("signup")
})

router.post("/", async(req,res)=>{
    const{name, email, contact, age, city, gender, password} = req.body
   
   
       
      const checkuser = await usermodel.findOne({email:email});
       if(checkuser){
    return res.send("Email already exists!");
   }
   bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(password, salt, async (err, hash)=>{
         const people = await usermodel.create({
        name: name,
        email: email,
        contact: contact,
         age: age,
         city: city,
         gender: gender,
         password: hash
    })
         console.log(people);
       
      })
   })
    const JWT_SECRET = "dsvhbkafbvd";
   let token = jwt.sign({email:email}, JWT_SECRET )
   res.cookie("email", token)
   
    res.render("login")
})

router.get("/login", (req, res)=>{
    res.render("login")
})
router.post("/login", async(req,res)=>{
    let user = await usermodel.findOne({email:req.body.email});
    if(!user){
      return res.send("something went wrong")
    }
    bcrypt.compare(req.body.password, user.password, (err, result)=>{
      if(result){
        return res.redirect("/dashboard" )
      } 
      res.send("something went wrong")
        
    } )
})
router.get("/dashboard", async (req, res) => {

    const users = await usermodel.find();

    console.log("Dashboard route hit");
    console.log("Users:", users);

   //  const totalUsers = await usermodel.countDocuments();

    res.render("dashboard", {users});
});
router.get("/logout", (req,res)=>{
    res.clearCookie("email");

    res.redirect("/login");
})

router.get("/user/:id", async (req, res) => {

    const id = req.params.id;
    const user = await usermodel.findById(id);
    if (!user) {
        return res.send("User not found");
    }
    res.render("userdetail", { user });
});

router.get("/user/:id/edit", async (req, res) => {

    const id = req.params.id;
    const user = await usermodel.findById(id);
    if (!user) {
        return res.send("User not found");
    }
    res.render("edit", { user });
});

router.post("/user/:id/edit", async (req, res) =>{
      const id = req.params.id;
    const { name, email, contact, age, city, gender } = req.body;
    await usermodel.findByIdAndUpdate(id, {
        name,
        email,
        contact,
        age,
        city,
        gender
    });
    res.redirect("/user/" + id);
})

router.post("/user/:id/delete", async (req, res) => {

    const id = req.params.id;
    await usermodel.findByIdAndDelete(id);
    res.redirect("/dashboard");
});





export default router