import Responses from "../response-template/response.js";

const permision = async (req, res, next) => {
  try {
    new Responses(res).success({ message: "permision accept" });
  } catch (error) {
    next(error);
  }
};

export default permision;
