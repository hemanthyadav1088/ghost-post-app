const mongoose = require('mongoose');
const Secret =  require('../models/secret.js');


const getSecrets = async(req,res)=>{
    try{
        const secrets = await Secret.find().sort({ createdAt: -1});
        res.json(secrets);
    }
    catch (err){
        res.status(500).json({message:err.message});

    }

}

const createSecret = async (req,res)=>{
    const {text , categeory} = req.body;
    try{
        const newSecret = await Secret.create({text,categeory});
        res.json(newSecret);
    }
    catch (err){
        res.status(500).json({message:err.message});

    }

}

const likeSecret = async(req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.json({Err:'No such secret'});
    }
    try{
        const secret = await Secret.findByIdAndUpdate(
            id,
            {$inc:{likes:1}},
            {new:true}
        );
        res.json(secret)

    }
    catch (err){
        res.status(500).json({message:err.message});

    }


}
module.exports = {getSecrets,createSecret,likeSecret};