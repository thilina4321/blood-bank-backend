import { Eligibility } from "../../model/blood-bank/eligibility";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";

const msgName = "eligibility";

export const getEligibility = async (_: Request, res: Response) => {
  const data = await Eligibility.find();
  res.status(200).send({
    success: true,
    data,
    message: `${msgName} fetch successfully`,
  });
};

export const addEligibility = async (req: Request, res: Response) => {
  const { title, description, items } = req.body;
  const createModelData = Eligibility.build({
    title,
    description,
    items,
  });

  const data = await createModelData.save();
  res
    .status(201)
    .send({ success: true, data, message: `create ${msgName} successfully` });
};

export const updateEligibility = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, items } = req.body;

  const data = await findDataByIdHelper(id, Eligibility, msgName);

  await data?.set({ title, description, items});

  await data?.save();

  res
    .status(200)
    .send({ success: true, data, message: `update ${msgName} successfully` });
};

export const deleteEligibility = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, Eligibility, msgName);
  await Eligibility.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: `delete ${msgName} successfully`,
  });
};
