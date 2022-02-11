const Joi = require("joi");
const Translation = require("../models/Translation");

module.exports = {
  create: async (req, res) => {
    try {
      const s = Joi.object({
        translations: Joi.string().required(),
      });
      await s.validateAsync(req.body);
      req.body.translations = JSON.parse(req.body.translations);
    } catch (err) {
      return res.status(400).send({ status: "false", message: err.message });
    }

    const schemas = Joi.array().items(
      Joi.object().keys({
        key: Joi.string().required(),
        value: Joi.string().required(),
        projectId: Joi.string().required(),
        langId: Joi.string().required()
      })
    );

    try {
      await schemas.validateAsync(req.body.translations);
    } catch (err) {
      return res.json(err.message);
    }




    try{
        const save = await Translation.insertMany(req.body.translations);
        res.json({status : 'true',message : 'Successfull',translation : save})
    }catch(err){
        return res.status(400).send({status : 'false',message : err.message});

    }
  },

  get: async (req, res) => {
    const schema = Joi.object({
      key: Joi.string(),
      value: Joi.string(),
      projectId: Joi.string(),
      accountId: Joi.string().required(),
      langId: Joi.string(),
    });

    const isAdmin = req.session.user.accountType == "1";
    const isThisUser = req.body.accountId == req.session.user.accountId;

    if (!(isAdmin || isThisUser))
      return res
        .status(400)
        .json({ status: "false", message: "Permission denied !" });

    try {
      await schema.validateAsync();
    } catch (e) {
      res.status(400).json({ status: "false", message: e.message });
    }

    try {
      //return res.json(req.body)
      const translation = await Translation.find({ ...req.body });

      res.json({ status: "true", message: "Successfully",translation: translation });
    } catch (e) {
      res.json({ status: "false", message: e.message });
    }
  },
};
