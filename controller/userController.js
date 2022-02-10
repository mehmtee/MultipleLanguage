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
      
    if(!(req.session.user._id == req.params.id || req.session.user.accountType == '1')) res.json({ status: "false", message: "Permission denied"});
      
      
      
    
      try{
        const user = await User.findOne({_id : req.params.id})
        return user ? res.json({status : "true", message: "User :",user : user}) : res.json({status : "false", message : "User not found"})

        }catch (e) {
          return res.json({status : "false", message : "Invalid ID"})
       }
  },

  getAll : async (req,res) => {
    try{
      const users = await User.find();

      return res.json({status : "true", message: "User list :",users : users})
    }catch (e) {
      return res.json({status : "false", message : e.message})
    }
  }


};
