const Joi = require('@hapi/joi');

const validation = post => {
  const categorySchema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = categorySchema.validate(category);

  if(error) {
    return {
      result: false,
      error
    }
  }
  return {
    result: true
  }
};

module.exports = validation;
