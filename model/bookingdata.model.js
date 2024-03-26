const mongoose = require("mongoose")

const FlightBooking = mongoose.model('Flight',{
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
});

module.exports = FlightBooking;