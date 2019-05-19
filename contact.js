const express = require('express');
const router = express.Router();
const request = require('request');
const nodemailer = require('nodemailer');
const cors = require('cors');

router.options('/send', cors()); 

router.get('/send', cors(), (req, res) => {
    const outputData = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.Phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        port: 25,
        auth: {
            user: 'mouni120493@gmail.com',
            pass: 'Teja@1995'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let HelperOptions = {
        from: 'mynameischaran493@gmail.com',
        to: 'mynameischaran493@gmail.com',
        subject: 'Asmaah Contact Request',
        text: 'Hello',
        html: outputData
    };



    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
    });

});


router.post('/send', cors(), (req, res) => {
    const outputData = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.Phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        port: 25,
        auth: {
            user: 'mouni120493@gmail.com',
            pass: 'Teja@1995'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let HelperOptions = {
        from: 'mynameischaran493@gmail.com',
        to: 'mynameischaran493@gmail.com',
        subject: 'Majeni Contact Request',
        text: 'Hello',
        html: outputData
    };



    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }  
        else{
            emailMessage = "Message sent: " + info.response;
        }
        return res.json({
            message: "success",
            email: emailMessage
          });
        console.log("The message was sent!");
        console.log(info);
    });

});

module.exports = router;