import activityService from "../services/activity-service.js";
import Responses from "../response-template/response.js";

const create = async (req, res, next) => {
  try {
    req.body.user_id = await req.id;
    const result = await activityService.create(req.body);
    new Responses(res).success(result);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await activityService.get(req.id);
    new Responses(res).success(result);
  } catch (error) {
    next(error);
  }
};

const adminGet = async (req, res, next) => {
  try {
    const result = await activityService.adminGet();
    new Responses(res).success(result);
  } catch (error) {
    next(error);
  }
};

const deletes = async (req, res, next) => {
  try {
    req.body.user_id = await req.id;
    const result = await activityService.deletes(req.body);
    result.message = await "success deletes";
    new Responses(res).success(result);
  } catch (error) {
    next(error);
  }
};

export default { create, get, adminGet, deletes };
