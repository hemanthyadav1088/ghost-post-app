require('dotenv').config();
const express =  require('express')
const cors = require('cors');
const secreteRoutes = require('./routes/secretRoutes.js');
const mongoose =require('mongoose');

const app =  express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("✅Mongo DB connection is sucessful!");
})
.catch((err)=>{
    console.log("❌Mongo DB connection failed",err);
});

app.use("/api/secrets",secreteRoutes);

app.listen(process.env.PORT,()=>{
    console.log("Mondo DB server is running on ",process.env.PORT)
});