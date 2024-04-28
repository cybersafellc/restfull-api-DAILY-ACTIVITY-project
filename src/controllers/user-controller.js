import Responses from "../response-template/response.js";
import userService from "../services/user-service.js";

const create = async (req, res, next) => {
  try {
    const result = await userService.create(req.body);
    new Responses(res).success(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    new Responses(res).setCookie("token", result.token);
    new Responses(res).success(result);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await userService.get(req.id);
    new Responses(res).success(result);
  } catch (error) {
    next(error);
  }
};

const adminGet = async (req, res, next) => {
  try {
    const result = await userService.adminGet();
    new Responses(res).success(result);
  } catch (error) {
    next(error);
  }
};
export default { create, login, get, adminGet };
