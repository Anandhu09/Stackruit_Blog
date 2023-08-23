const { ObjectId } = require('mongoose').Types;
const Joi = require("joi")

// Joi schema for creating a new blog post
const createPostSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author:Joi.string().required(),
    publicationDate: Joi.string()
  });
  
  // Middleware for validating the request body
  const validateRequestBody = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    };
  };
  
  // Middleware for validating the ID from request parameters
  const validateIdParam = (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectID' });
    }
    next();
  };
  

  module.exports ={
    createPostSchema,validateRequestBody,validateIdParam
  }