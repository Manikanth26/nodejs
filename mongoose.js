const mongoose = require('mongoose')
const express = require('express')

const app = express();
app.use(express.json());

//mongoose.connect('mongodb://127.0.0.1:27017/task');

const User = mongoose.model('User',{
    id:{
        type:Number
    },
    fromLocation:{
        type:String
    },
    toLocation:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    }
})

app.post('/book',(req,res)=>{

    const user = new User(req.body);
    
    user.save().then(()=>{
        res.send(user)
    })
})

app.get('/getBook/:id',(req,res)=>{
    const _id = req.params.id;

    User.findOne({id :_id}).then((user)=>{
        // if(!user)
        // {
        //     return res.status(404).send();
        // }
        res.send(user)
    })
})

app.put('/updateBook/:id',async (req,res)=>{

    const id1 = req.params.id;

    let data = await User.updateOne({id : id1}, {$set : req.body});

    res.send(data)
})

app.delete('/deleteBook/:id', async (req,res)=>{
    const id2 = req.params.id;

    let data = await User.deleteOne({id: id2});

    res.send(data)
})

app.listen(3000);