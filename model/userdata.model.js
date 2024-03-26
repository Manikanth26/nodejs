const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    firstName : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    phoneNumber : {
        type : Number,
        require : true
    }
});

const userDb = mongoose.model('Users',schema);

module.exports = userDb