import { BadRequest } from ".";

export const isSingleItemCreate = async (model: any) => {
  
  const itemCount = await model.find().count();

  if (itemCount > 0) {
    return false
    // throw new BadRequest("Can not create more than one item");
  }
  return true
};
