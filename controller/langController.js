const LangModel = require('../models/Lang');
const Joi = require('joi');
module.exports = {
    get : async (req,res) => {
        try{
            const r = await LangModel.find({projectId : req.params.projectId});
            res.json({status : 'true',langs : r,message : 'Lang list',langs : r})
    
        }catch(e){
            res.json({status : 'false',message : e.message})

        }
    },
    create : async (req,res) => {
        const schema = Joi.object({
            projectId : Joi.string().required(),
            code : Joi.string().required(),
            name : Joi.string().required()
        })

        try{
            schema.validateAsync(req.body);
        }catch(e) {
            res.json({status : 'false',message : e.message})
        }

        try{
            const lang = new LangModel(req.body);

            const save = await lang.save();

            return res.json({status : 'true',message : 'Created lang',lang : save})

        }catch(e) {
            return res.json({status : 'false',message : e.message})
        }


    }
}