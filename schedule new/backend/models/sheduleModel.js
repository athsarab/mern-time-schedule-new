const mongoose = require ("mongoose");

const scheduleScema = new mongoose.Schema({

    startLocation: {
        type: String,
        required: true,
    },
    endLocation: {
        type: String,
        required: true,
    },
    dtime: {
        type: String,
        required: true,
    },
    atime: {
        type: String,
        required: true,
    },
    number:{
       type: String ,
       required: true,
    },
    profile:{
        type: String ,
        required: false,
     }

});


module.exports = Schedule = mongoose.model("schedule", scheduleScema );

