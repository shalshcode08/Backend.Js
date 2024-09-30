// require('dotenv').config({path : './env'})

// improved
import dotenv from 'dotenv'
import connectDB from "./db/index.js";

dotenv.config({
    path : './env'
})

connectDB()



/*
// 1st approach 

import express from 'express'
const app = express()

//ifie
(async()=> {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error', ()=> {
            console.log("Error :" ,error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })

    } 

    catch (error) {
        console.error("ERROR : ", error)
    }
})()
*/