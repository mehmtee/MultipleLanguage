const Joi = require("joi");
const Translation = require("../models/Translation");
const Project = require("../models/Project");
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
        langId: Joi.string().required(),
      })
    );

    try {
      await schemas.validateAsync(req.body.translations);
    } catch (err) {
      return res.json(err.message);
    }

    try {
      const save = await Translation.insertMany(req.body.translations);
      res.json({ status: "true", message: "Successfull", translation: save });
    } catch (err) {
      return res.status(400).send({ status: "false", message: err.message });
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

      res.json({
        status: "true",
        message: "Successfully",
        translation: translation,
      });
    } catch (e) {
      res.json({ status: "false", message: e.message });
    }
  },

  getForUpdate: async (req, res) => {
    const schema = Joi.object({
      key: Joi.string().required(),
      projectId: Joi.string().required(),
      accountId: Joi.string(),
      
    });

    try{
      await schema.validateAsync(req.body);
      const isAdmin = req.session.user.accountType == "1";
      const isThisUser = req.body.accountId == req.session.user.accountId;
      if (!(isAdmin || isThisUser)) throw new Error();

    }catch (e) {
      return res
      .status(400)
      .json({ status: "false", message: "Permission denied !" });
    }


    let project = null;

    try{
     //Projenin dillerini getirir (Projeye yeni dil eklenmişse o diller de db'ye eklenir).

      project = await Project.findOne({_id : req.body.projectId});
      
      if(!project) return res.json({ status : 'false',message :'Project not found'});
      
      const langList = project.langs;


      const thisWillAddLangValues = [];

      let values = [];

      let responseValues = {};


      let copyObject = null;

      // Eğer o dile ait key yoksa thisWillAddLangValues'e ekliyor, olan bir kayıtı da kopyalama için tutuyor.
      for(const item of langList) {
        const find =  await Translation.findOne({projectId : req.body.projectId,key : req.body.key,langId : item});
        if(!find) thisWillAddLangValues.push(item);
        else values.push(find);

        //kopyalama kayıtı
        if(!copyObject && find) {
          copyObject = find
      }
      }


      if(!copyObject) res.json({ status: "false", message: "This key invalid !"});


      // Eksik kayıtları tamamlıyor

      console.log(thisWillAddLangValues)

      for(const item of thisWillAddLangValues){
        const newRecord = new Translation({
          key : copyObject.key,
          value : "",
          projectId : copyObject.projectId,
          langId : item 
        });
        let insert = await newRecord.save();
        values.push(insert);
      }


      //response valuesi dile göre formatlıyor.

      for(const item of values){
        responseValues[item.langId] = item;
      }


      res.json({status : 'true', message : "List",responseValues});



    }catch(e) {
      return res.json({ status: "false", message: e.message });
    }


    



    
  },
};
