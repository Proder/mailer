const nodemailer = require("nodemailer")
const express= require("express")
const dotenv=require("dotenv")
const app=express()
const cors=require("cors")
app.use(cors())
app.use(express.json())

dotenv.config()
const port=process.env.PORT || 3000
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shahdhruvmayank@gmail.com',
        pass: process.env.key
    }
});

app.post("/",async(req,res)=> {
    try {
        let mailOptions = {
            from: 'shahdhruvmayank@gmail.com',
            to: 'shahdhruvmayank@gmail.com',
            subject: "Brochure Downloaded",
            text: `The details of the individual is as under:\n\nName: ${req.body.name} \nPhone: ${req.body.ph_number} \nOrganization: ${req.body.org} \nEmail: ${req.body.mail}` 
        }

        let info = await transporter.sendMail(mailOptions)
        console.log(info.response)
        res.send( info.response)

    } catch (err) {
        console.log(err)
        res.send(err)
    }
}) 

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})