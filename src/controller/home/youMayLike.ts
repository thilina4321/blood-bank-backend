import { YouMayLike } from "../../model/home/youMayLike";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";
import { isSingleItemCreate } from "../../error/single-item-error";
import { BadRequest } from "../../error";

const msgName = "you may like";

export const getYouMayLike = async (_: Request, res: Response) => {
  const data = await YouMayLike.find();
  res.status(200).send({
    success: true,
    data,
    message: `${msgName} fetch successfully`,
  });
};

export const getSingleYouMayLike = async (req: Request, res: Response) => {
  const { title } = req.params;

  const youMayLike = await YouMayLike.find();
  if (!youMayLike[0]) {
    throw new BadRequest("No item found for this title");
  }
  const findIndex = youMayLike[0].items.findIndex(
    (like) => like.title === title
  );
  if (findIndex === -1) {
    throw new BadRequest("No item found for this title");
  }

  res.status(200).send({
    success: true,
    data: youMayLike[0].items[findIndex],
    message: `${msgName} fetch successfully`,
  });
};

export const addYouMayLike = async (req: Request, res: Response) => {
  const { title, imageUrl, items = [] } = req.body;

  const isCreate = await isSingleItemCreate(YouMayLike);
  let data;

  if (!isCreate) {
    const findData = await YouMayLike.find();
    findData[0]?.set({ title, imageUrl, items: findData[0]?.items });
    data = await findData[0]?.save();

    return res
      .status(201)
      .send({ success: true, data, message: `create ${msgName} successfully` });
  }

  const createModelData = YouMayLike.build({
    title,
    imageUrl,
    items,
  });

  data = await createModelData.save();
  res
    .status(201)
    .send({ success: true, data, message: `create ${msgName} successfully` });
};

export const updateYouMayLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, imageUrl, items } = req.body;

  const data = await findDataByIdHelper(id, YouMayLike, msgName);

  await data?.set({ title, imageUrl, items });

  await data?.save();

  res
    .status(200)
    .send({ success: true, data, message: `update ${msgName} successfully` });
};

export const deleteYouMayLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, YouMayLike, msgName);
  await YouMayLike.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: `delete ${msgName} successfully`,
  });
};
