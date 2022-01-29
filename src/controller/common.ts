import { BadRequest } from "../error";

export const findDataByIdHelper = async (id: any, model: any, msg: any) => {
  const existingData = await model.findById(id);
  if (!existingData) {
    throw new BadRequest(`${msg} can not find`);
  }
  return existingData;
};
