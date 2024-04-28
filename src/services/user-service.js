import { prismaClient } from "../app/database.js";
import ResponseError from "../errors/response-error.js";
import userValidation from "../validations/user-validation.js";
import validate from "../validations/validate.js";
import GenereteId from "../generateId/genereteId.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const create = async (request) => {
  const result = await validate(userValidation.create, request);
  const count = await prismaClient.user.count({
    where: {
      username: result.username,
    },
  });
  if (count) {
    throw new ResponseError(400, "username already exist");
  }
  result.id = await new GenereteId(prismaClient.user).Exe();
  result.password = await bcrypt.hash(result.password, 10);
  return await prismaClient.user.create({
    data: result,
    select: {
      username: true,
    },
  });
};

const login = async (request) => {
  const result = await validate(userValidation.login, request);
  const data = await prismaClient.user.findFirst({
    where: {
      username: result.username,
    },
  });
  if (!data) {
    throw new ResponseError(400, "username does not exist");
  }
  if (await bcrypt.compare(result.password, data.password)) {
    const token = await Jwt.sign({ id: data.id }, process.env.USER_SECRET, {
      expiresIn: "1h",
    });
    return await {
      message: "login success",
      token: token,
    };
  } else {
    throw new ResponseError(400, "password incorect");
  }
};

export default { create, login };
