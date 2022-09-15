import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const noteValidator = (req, res, next) => {
    const schema = Joi.object({
        Title: Joi.string().min(4).alphanum(2).required(),
        Description: Joi.string().min(4).required(),
        Color: Joi.string().optional()
        
    });
    const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};