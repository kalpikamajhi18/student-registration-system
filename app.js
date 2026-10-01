import express from "express"
import router from "./router.js"
import mongoose from "mongoose"
const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use(router)





const port = 3000;

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})
