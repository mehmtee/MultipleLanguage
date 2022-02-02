const mongoose = require("mongoose");
const Joi = require("joi");
const User = require("../models/users");
module.exports = {
  create: async (req,res) => {

    try{
        if(req.session.user.accountType != '1' || req.session.user.accountType != 1){
            throw new Error;
        }
    }catch(e){
        return res.json({status: "false", message: 'Permission denied'})       
    }



    const schema = Joi.object({
        email : Joi.string().max(64),
        password : Joi.string().max(64),
        accountType : Joi.string()
    })

    try {
      await schema.validateAsync(req.body);
    } catch (e) {
      res.status(404).json({ status: "false", message: e.message });
    }

    try {
      const user = new User(req.body);
      const create = await user.save();
      res.json({ status: "true", message: create });
    } catch (e) {
      res.json({ status: "false", message: e.message });
    }
  },

  get : async (req,res) => {
    

    try{

    }catch (e) {

    }
  }


};
