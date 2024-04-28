import { prismaClient } from "../app/database.js";
import ResponseError from "../errors/response-error.js";
import activityValidations from "../validations/activity-validations.js";
import validate from "../validations/validate.js";
import GenereteId from "../generateId/genereteId.js";

const create = async (request) => {
  const result = await validate(activityValidations.create, request);
  const count = await prismaClient.activity.count({
    where: result,
  });
  if (count) {
    throw new ResponseError(400, "this activity already exist");
  }
  result.id = await new GenereteId(prismaClient.activity).Exe();
  return await prismaClient.activity.create({
    data: result,
    select: {
      id: true,
      details: true,
    },
  });
};

const get = async (id) => {
  const result = await validate(activityValidations.get, id);
  const datas = await prismaClient.activity.findMany({
    where: {
      user_id: result,
    },
    select: {
      details: true,
      id: true,
    },
  });

  const fixData = await [];
  for (let i = 0; i < datas.length; i++) {
    const obj = await {
      id: i + 1,
      id_forDel: datas[i].id,
      activity: datas[i].details,
    };
    await fixData.push(obj);
  }
  return fixData;
};

const adminGet = async () => {
  return await prismaClient.activity.findMany();
};

const deletes = async (request) => {
  const result = await validate(activityValidations.deletes, request);
  const count = await prismaClient.activity.count({
    where: {
      id: result.id_forDel,
      user_id: result.user_id,
    },
  });
  if (!count) {
    throw new ResponseError(
      400,
      `id_forDel ${result.id_forDel} does not exist`
    );
  }
  return await prismaClient.activity.delete({
    where: {
      user_id: result.user_id,
      id: result.id_forDel,
    },
    select: {
      details: true,
    },
  });
};

export default { create, get, adminGet, deletes };
