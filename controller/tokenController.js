const userController = require('./userController');
const loginController = require('./loginController');
const UserModel = require('../models/users');
const jwt = require('jsonwebtoken')
module.exports = {
    get : async(req,res) => {
        try{
            const user = await UserModel.findOne({_id : req.params.id})
            const token = jwt.sign({user : user,expiresIn:3600},'mehmet');
            res.json({status : 'true',token})
            }catch (e) {
                return res.json({status: 'false',message : e.message})
           }
    },
    validate : async(req,res) => {
            const r = jwt.verify(req.headers["api-token"], "keyboard cat", (err) => {
            const account = jwt.decode(req.headers["api-token"]);
            res.json({
              status: "true",
              message: "Validate successfully",
              account : account.user,
              token: req.headers["api-token"],
            });
          });
    }
}