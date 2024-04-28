import ResponseError from "../errors/response-error.js";
import { logger } from "../app/logging.js";
import Responses from "../response-template/response.js";

const receiptError = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  if (err instanceof ResponseError) {
    new Responses(res).customError(err.status, err.message);
  } else {
    new Responses(res).error(err.message);
    logger.error(err.message);
  }
};

const notFound = async (req, res, next) => {
  try {
    throw new ResponseError(404, "page not found");
  } catch (error) {
    next(error);
  }
};

export default { receiptError, notFound };
