import validate from "../validations/validate.js";
import adminValidation from "../validations/admin-validation.js";
import { prismaClient } from "../app/database.js";
import ResponseError from "../errors/response-error.js";
import GenereteId from "../generateId/genereteId.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const create = async (request) => {
  const result = await validate(adminValidation.create, request);
  const count = await prismaClient.admin.count({
    where: {
      username: result.username,
    },
  });
  if (count) {
    throw new ResponseError(400, "username already exist");
  }
  result.id = await new GenereteId(prismaClient.admin).Exe();
  result.password = await bcrypt.hash(result.password, 10);
  return await prismaClient.admin.create({
    data: result,
    select: {
      username: true,
    },
  });
};

const login = async (request) => {
  const result = await validate(adminValidation.login, request);
  const data = await prismaClient.admin.findFirst({
    where: {
      username: result.username,
    },
  });
  if (!data) {
    throw new ResponseError(400, "username does not exist");
  }
  if (await bcrypt.compare(result.password, data.password)) {
    const token = await Jwt.sign({ id: data.id }, process.env.ADMIN_SECRET, {
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
