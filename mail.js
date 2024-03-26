const nodemailer = require('nodemailer')

let nodeMail = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'manikanth.190503@gmail.com',
        pass: 'ufdvxtzazkuceabg'
    }
})

let mailDetails = {
    from : 'manikanth.190503@gmail.com',
    to: 'maninetha26@gmail.com',
    subject : 'New Mail 2',
    text : 'Hello This is mani'
}

nodeMail.sendMail(mailDetails, (err,data)=>{
    if(err){
        console.log("Error");
    }
    console.log("Email sent successfully");
});
