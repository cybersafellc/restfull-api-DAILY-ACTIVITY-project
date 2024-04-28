import adminService from "../services/admin-service.js";
import Responses from "../response-template/response.js";

const create = async (req, res, next) => {
  try {
    const result = await adminService.create(req.body);
    result.message = await "successfuly created";
    new Responses(res).success(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await adminService.login(req.body);
    new Responses(res).setCookie("token", result.token);
    new Responses(res).success(result);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await adminService.get(req.id);
    new Responses(res).success(result);
  } catch (error) {
    next(error);
  }
};

export default { create, login, get };
