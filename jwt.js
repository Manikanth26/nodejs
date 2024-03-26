const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const express = require("express")
const bodyparser = require("body-parser")
const Users = require("./model/userdata.model.js");
const FlightBooking = require("./model/bookingdata.model.js");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/User-Data")

//using primary key in db
//get db call and post signup
app.post("/signup", (req,res)=>{
    try{
        const user = new Users(req.body);
        const findUser = Users.findOne({email : req.body.email})
        findUser.then(() =>{
        if(findUser)
        {
            res.status(403).send("Already registered with this email");
        }
        else
        { 
            user.save().then(() =>{
                console.log("User Successfully Registered");
                res.status(200).send(`User Successfully Registered, user-data : ${req.body.firstName}`);
            });
            
        }
    }
        )
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).send("Internal Server Error")
    }
});

app.post("/login",async (req,res)=>{
    const {email , password} = req.body;
    const isUser = await Users.findOne({email , password});
    if(isUser)
    {
        const token = jwt.sign({email} , "mynewsecretkeyforthis");
        res.status(200).json({token : token});
    }
    else
    {
        console.log("User not found");
        return res.status(404).send();
    }  
});

app.post('/book-ticket',verifyToken ,(req,res)=>{
    const user = new FlightBooking(req.body);
    user.save();
    res.status(200).send("Ticket has booked successfully");
})

app.get('/fetch-ticket/:id',verifyToken,async (req,res)=>{
    const _id = req.params.id;
    const findTicket = await FlightBooking.findOne({id :_id});
    if(!findTicket)
    {
        res.status(404).send();
    }
    else
    {
        res.status(200).send(findTicket);
    }
})

app.put('/update-ticket/:id',verifyToken,async (req,res)=>{

    const id1 = req.params.id;
    const findTicket = await FlightBooking.findOne({id :id1});

    if(!findTicket)
    {
        res.status(404).send();
    }
    else
    {
        let data = await FlightBooking.updateOne({id : id1}, {$set : req.body});
        res.status(200).send("Updated the flight ticket");
    }

    
})

app.delete('/delete-ticket/:id',verifyToken, async (req,res)=>{
    const id2 = req.params.id;
    const findTicket = await FlightBooking.findOne({id :id2});

    if(!findTicket)
    {
        res.status(404).send();
    }
    else
    {
        let data = await FlightBooking.deleteOne({id: id2});
        res.status(200).send("Ticket has deleted");
    }
})

function verifyToken(req,res,next){
    const auth = req.headers['authorization'];
    if(!auth){
        console.log("Authorization header not found");
        return res.status(400).send();
    }
    const token = auth.split(' ')[1];
    if(!token){
        const result = res.status(404).send();
        console.log("Token not found");
        return result;
    }
    jwt.verify(token , "mynewsecretkeyforthis", (err,user)=>{
        if(err){
            console.log("Token verification failed");
            return res.status(404).send();
        }
        req.user = user;
        next();
    })
}

app.listen(3000,()=>{
    console.log("Server is running");
});

module.exports = app
