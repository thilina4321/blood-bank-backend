import { DonateBlood } from "../../model/blood-bank/donate-blood";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";
import { BadRequest } from "../../error/bad-request";
import { isSingleItemCreate } from "../../error/single-item-error";

const msgName = "donate blood";

export const getDonateBlood = async (_: Request, res: Response) => {
  const data = await DonateBlood.find();
  res.status(200).send({
    success: true,
    data,
    message: `${msgName} fetch successfully`,
  });
};

export const addDonateBlood = async (req: Request, res: Response) => {
  const { title, description, items } = req.body;

  let isCreate = await isSingleItemCreate(DonateBlood);
  let data;

  if (!isCreate) {
    const findData = await DonateBlood.find();
    findData[0]?.set({ title, description, items: findData[0]?.items });
    data = await findData[0]?.save();

    return res
      .status(201)
      .send({ success: true, data, message: `create ${msgName} successfully` });
  }

  const createModelData = DonateBlood.build({
    title,
    description,
    items,
  });

  data = await createModelData.save();
  res
    .status(201)
    .send({ success: true, data, message: `create ${msgName} successfully` });
};

export const updateDonateBlood = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, items } = req.body;

  const data = await findDataByIdHelper(id, DonateBlood, msgName);

  await data?.set({ title, description, items });

  await data?.save();

  res
    .status(200)
    .send({ success: true, data, message: `update ${msgName} successfully` });
};

export const deleteDonateBlood = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, DonateBlood, msgName);
  await DonateBlood.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: `delete ${msgName} successfully`,
  });
};
