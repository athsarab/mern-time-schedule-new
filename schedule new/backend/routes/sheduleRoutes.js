const express = require("express");


const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get("/report", async (req, res) => {
    try {
        const shedule = await shedule.find();
        
        if (!shedule || shedule.length === 0) {
            return res.status(400).json({ msg: "No timetable found" });
        }

        const filePath = path.join(__dirname, 'report.txt'); // You can change the file type and name as per your requirement

        let reportData = "Reservation Report\n\n";

        shedule.forEach((shedule, index) => {
            reportData += `Reservation ID: ${shedule._id}\n`;
            reportData += `Start location: ${shedule.startLocation}\n`;
            reportData += `End Location: ${shedule.endLocation}\n`;
            reportData += `time: ${shedule.dtime}\n`;
            reportData += `Number of Seats: ${shedule.atime}\n`;
            reportData += `Seats: ${shedule.number.join(', ')}\n`; 

            reportData += "-------------------------\n";
        });

        fs.writeFileSync(filePath, reportData);

        res.download(filePath, 'timetable_report.txt', (err) => {
            if (err) {
                return res.status(500).json({ msg: "Error downloading file", error: err });
            }
            fs.unlinkSync(filePath); // Delete the file after downloading
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});


const schedule = require("../models/sheduleModel");

//testing
router.get("/test",(req,res) => res.send("Routes working"));

router.post ("/", (req,res) =>{
    schedule.create(req.body)
   .then(()=>res.json({msg:"schedule successfully "}))
   .catch(()=>res.status(400).json({msg:"schedule failed"}));
     
});

router.get("/",(req,res) =>{
    schedule.find()
    .then((schedule)=>res.json(schedule))
    .catch(()=>res.status(400).json({msg:"No schedule found"})); 

});

router.get("/:id",(req,res) =>{
    schedule.findById(req.params.id)
    .then((schedule)=>res.json(schedule))
    .catch(()=>res.status(400).json({msg:"Cannot find schedule"})); 

});



router.put("/:id",(req,res)=>{
    schedule.findByIdAndUpdate(req.params.id,req.body)
    .then(()=>res.json({msg:"Update successful"}))
    .catch(() => res.status(400).json({msg:"Update failed"}))
    
});

router.delete("/:id",(req,res) => {
    schedule.findByIdAndDelete(req.params.id)
    .then(() => res.json({msg:"Deleted successfully"}))
    .catch(() => res.status(400).json({msg:"Cannot be Deleted"}))

});





module.exports = router;