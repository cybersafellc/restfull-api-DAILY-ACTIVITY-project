import Joi from "joi";

const create = Joi.object({
  user_id: Joi.number().required(),
  details: Joi.string().required(),
});

const get = Joi.number().required();

const deletes = Joi.object({
  user_id: Joi.number().required(),
  id_forDel: Joi.number().required(),
});

export default { create, get, deletes };
