const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const port = process.env.PORT || 3000

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())


const transporter = nodemailer.createTransport({
    host: process.env.SERVICE,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.WORD
    }
})
// verifying the connection config
transporter.verify(function(error, success){
    if (error){
        console.log(error)
    } else{
        console.log("== server is ready to take messages ==")
    }
})

app.post('/send', (req, res, next)=>{
    let mail = {
        from: `${req.body.emailState.email}`,
        to: process.env.EMAIL, 
        subject: `Message From ${req.body.emailState.email}`,
        text: `${req.body.emailState.email} says, ${req.body.message.message}`
    }
    transporter.sendMail(mail, (err, data) =>{
        if (err){
            res.json({
                status:'fail'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
})


app.use(cors())
app.use(express.json())
app.listen(port, ()=> console.log(`up and running on port ${port}`))