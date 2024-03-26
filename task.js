// const http = require("http");

// const getData = new Promise((resolve,reject)=>{
//     if(reject)
//     {
//         console.log("Failed getting the data_6")
//     }
//     http.get("http://dummyapiababab.online/pi/movies",(res,rej)=>{
//         if(rej)
//         {
//             console.log("Failed getting the data")
//         }
//         resolve();
//     })
// })
// getData
// .then(()=>{
//     console.log("Data Fetched");
// })
// .catch((error)=>{
//     console.log(`Error : ${error}`);
// })

const express = require("express");
const http = require("http");
const app = express();
app.get('/api/external-data', async (req, res) => { 
    try { 
        const response = await http.get('http://dummyapi.online/api/movies'); 
        // Replace with the API URL you want to call 
        // Process the response data as needed 
        //const data = response; 
        // Send the data as the response 
        res.json({ msg : "got the data"}); 
    } catch (error) { 
        // Handle errors 
        console.error('Error making API call:', error); 
        res.status(500).json({ error: 'Internal Server Error' }); 
    } 
    });

app.listen(5000,()=>{
    console.log(`Server is running 5000`);
});

// function fetchData(){
    
// }
// fetchData.then(()=>{
//     console.log("Data fetched");
// // })
// fetch("https://dummyapi.online/api/movies")
// .then(()=>{
//     console.log("Data fetched");
// })
// ("/signup", (req,res)=>{
//     try{
//         const user = new Users(req.body);
//         const findUser = Users.findOne({email : req.body.email})
//         findUser.then(() =>{
//         if(findUser)
//         {
//             res.status(403).send("Already registered with this email");
//         }
//         else
//         { 
//             user.save().then(() =>{
//                 console.log("User Successfully Registered");
//                 res.status(200).send(`User Successfully Registered, user-data : ${req.body.firstName}`);
//             });
            
//         }
//     }
//         )
//     }
//     catch(err)
//     {
//         console.error(err);
//         return res.status(500).send("Internal Server Error")
//     }
// });