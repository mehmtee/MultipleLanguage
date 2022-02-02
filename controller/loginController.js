const jwt = require('jsonwebtoken');
const Joi = require('joi');
const secretKey = "mehmet"

const User = require('../models/users');

const loginController = {

    login : async (req,res) => {
        const schema = Joi.object({
            email : Joi.string().max(64),
            password : Joi.string().max(64),
        })

        try{
            await schema.validateAsync(req.body);
        }catch(err){
            return res.status(400).send({status : 'false',message : err.message});            
        }



        try{
            const u = (await User.findOne(req.body))
            
            if(u){
                const token = jwt.sign({user : u,expiresIn:3600},secretKey)
                return res.status(200).send({status : 'true',message : 'Successfull',token })
            }else{
                return res.status(200).send({status : 'false',message :'User not found !'})
            }
        }catch(err){
            return res.status(400).send({status : 'false',message : err.message}); 
        }

    }   

}


module.exports =loginController