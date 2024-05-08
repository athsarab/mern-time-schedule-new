const mongoose = require ("mongoose");

const dburl = "mongodb+srv://yeharadananjaya:MegaSyD11@cluster0.y3xepjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.set("strictQuery",true,"userNewUrlPaser",true);

const connection = async() =>{
    try{
        await mongoose.connect(dburl);
        console.log("MongoDB connected");
    }catch(e){
        console.error(e.message);
        process.exit();
    }

};

module.exports = connection;