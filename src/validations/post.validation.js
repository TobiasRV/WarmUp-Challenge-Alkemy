const Joi = require('@hapi/joi');

const validation = post => {
  const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    image: Joi.string()
      .regex(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)
      .required(),
    category_id: Joi.required()
  });

  const { error } = postSchema.validate(post);

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
