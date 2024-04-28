import ResponseError from "../errors/response-error.js";
import jwt from "jsonwebtoken";

const admin = async (req, res, next) => {
  try {
    const cookie = await req.cookies.token;
    if (!cookie) {
      throw new ResponseError(400, 'cookie["token"] required');
    }
    await jwt.verify(cookie, process.env.ADMIN_SECRET, (err, decode) => {
      if (err) {
        throw new ResponseError(400, 'cookie["token"] invalid');
      }
      req.id = decode.id;
      next();
    });
  } catch (error) {
    next(error);
  }
};

const user = async (req, res, next) => {
  try {
    const cookie = await req.cookies.token;
    if (!cookie) {
      throw new ResponseError(400, 'cookie["token"] required');
    }
    await jwt.verify(cookie, process.env.USER_SECRET, (err, decode) => {
      if (err) {
        throw new ResponseError(400, 'cookie["token"] invalid');
      }
      req.id = decode.id;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default { admin, user };
