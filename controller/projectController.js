const Project = require("../models/Project");
const LangModel = require("../models/Lang");
const Joi = require("joi");
module.exports = {
  create: async (req, res) => {
    const schema = Joi.object({
      accountId: Joi.string().required(),
      projectName: Joi.string().required(),
      langs: Joi.array().required(),
    });

    try {
      req.body.langs = JSON.parse(req.body.langs);
      await schema.validateAsync(req.body);
    } catch (err) {
      return res.status(400).send({ status: "false", message: err.message });
    }

    // adminse veya account id ise next

    try {
      let c =
        req.body.accountId == req.session.user.accountId ||
        req.session.user.accountType == "1";
      if (!c) throw new Error();
    } catch (err) {
      return res
        .status(403)
        .send({ status: "false", message: "Permission denied !" });
    }

    try {
      const project = new Project(req.body);
      const save = await project.save();
      res.json({ status: "true", message: "Successfull", project: save });
    } catch (err) {
      return res.status(400).send({ status: "false", message: err.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const result = await Project.deleteOne({ _id: req.params.id });
      return res.json({ status: "true", message: "Success" });
    } catch (err) {
      return res.json({ status: "false", message: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const schema = Joi.object({
        projectId: Joi.string(),
        accountId: Joi.string().required(),
      });
      await schema.validateAsync(req.params);
    } catch (err) {
      return res.json({ status: "false", message: err.message });
    }
    if (
      !(
        req.session.user.accountType == "1" ||
        req.session.user.accountId == req.params.accountId
      )
    )
      res.status(403).send({ status: "false", message: "Permission denied" });

    try {
      const result = await Project.findOne({ accountId: req.params.accountId });

      const project = result ? result : [];

      res.json({
        status: "true",
        project,
        message: "Successfully getting project.",
      });
    } catch (err) {
      return res.status(400).send({ status: "false", message: err.message });
    }
  },

  get: async (req, res) => {
    try {
      const result = await Project.find();
      res.json({
        status: "true",
        projects: result,
        message: "Successfully getting project.",
      });
    } catch (err) {
      return res.status(400).send({ status: "false", message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      let c =
        req.body.accountId == req.session.user.accountId ||
        req.session.user.accountType == "1";
      if (!c) throw new Error();
    } catch (err) {
      return res
        .status(403)
        .send({ status: "false", message: "Permission denied !" });
    }

    const schema = Joi.object({
      accountId: Joi.string().required(),
      projectName: Joi.string().required(),
      projectId: Joi.string().required(),
    });

    try {
      await schema.validateAsync(req.body);
    } catch (err) {
      return res.status(400).send({ status: "false", message: err.message });
    }

    try {
      const project = new Project();
      const result = await Project.updateMany(
        { _id: req.body.projectId },
        { $set: { projectName: req.body.projectName } }
      );
      res.json({
        status: "true",
        message: "Successfully updated.",
        project: result,
      });
    } catch (err) {
      return res.status(400).send({ status: "false", message: err.message });
    }
  },
};
