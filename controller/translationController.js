const Joi = require('joi');
const Translation = require('../models/Translation');

module.exports = {
    create : async (req,res) => {
        
        const schema = Joi.object({
            key : Joi.string().required(),
            value : Joi.string().required(),
            accountId : Joi.string().required(),
            projectId : Joi.string().required(),
            langId : Joi.string().required()
        })

        try{
            await schema.validateAsync(req.body)
        }catch(err){
            return res.status(400).send({status : 'false',message : err.message});            
        }


        try{
            const translation = new Translation(req.body);
            const save = await translation.save();
            res.json({status : 'true',message : 'Successfull',translation : save})
        }catch(err){
            return res.status(400).send({status : 'false',message : err.message});            

        }
    },

    get : async (req,res) => {
        const schema = Joi.object({
            key : Joi.string(),
            value : Joi.string(),
            projectId : Joi.string(),
            accountId : Joi.string().required(),
            langId : Joi.string()
        })


        const isAdmin = (req.session.user.accountType == '1');
        const isThisUser = (req.body.accountId == req.session.user.accountId);

        if(!(isAdmin || isThisUser)) return res.status(400).json({status: 'false',message : 'Permission denied !'});

        try{
            await schema.validateAsync();
        }catch(e){
            res.status(400).json({status: 'false',message : e.message});
        }

        try{
            //return res.json(req.body)
            const translation = await Translation.find({...req.body})
            
            res.json({status : 'true',message : translation})
        }catch(e){
            res.json({status : 'false',message : e.message});
        }

    }
}