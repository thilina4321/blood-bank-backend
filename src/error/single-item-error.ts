import { BadRequest } from ".";

export const singleItemError = async (model: any) => {
  
  const itemCount = await model.find().count();

  if (itemCount > 0) {
    throw new BadRequest("Can not create more than one item");
  }
};
