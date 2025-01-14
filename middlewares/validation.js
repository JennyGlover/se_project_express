const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const clothingitems = require('../models/clothingitems');


module.exports.validateClothingItems = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" filed is 2',
      "string.max": 'The maximum length of the "name" filed is 30',
      "string.empty": 'The "name" field must be field in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" filed must be filled in',
      "string.url": 'the "imageUrl" filed must be a valid url',
    })
  })
})


module.exports.userInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" filed is 2',
      "string.max": 'The maximum length of the "name" filed is 30',
      "string.empty": 'The "name" field must be field in',
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" filed must be filled in',
      "string.url": 'the "avatar" filed must be a valid url',
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be field in',
      "string.email": 'the "email" filed must be a valid email',
    }),

    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be field in',
    }),
  })
})


module.exports.login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be field in',
      "string.email": 'the "email" filed must be a valid email',
    }),

    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be field in',
    }),
  })
})

module.exports.id = celebrate({
  params: Joi.object().keys({
    id: Joi.num().required().min(24).max(24).messages({
      "num.id": 'The "id" field must be a number',
      "num.min": 'The minimum length of the "name" filed is 24',
      "num.max": 'The maximum length of the "name" filed is 24',
    }),
  })
})

module.exports.validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.url');
}