import { Information } from "../../model/home/information";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";

const msgName = "home information";

export const getHomeInformation = async (_: Request, res: Response) => {
  const data = await Information.find();
  res.status(200).send({
    success: true,
    data,
    message: `${msgName} fetch successfully`,
  });
};

export const addHomeInformation = async (req: Request, res: Response) => {
  const { title, description, imageUrl } = req.body;
    
  const createModelData = Information.build({
    title,
    description,
    imageUrl,
  });

  const data = await createModelData.save();
  res
    .status(201)
    .send({ success: true, data, message: `create ${msgName} successfully` });
};

export const updateHomeInformation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, imageUrl } = req.body;

  const data = await findDataByIdHelper(id, Information, msgName);

  await data?.set({ title, description, imageUrl });

  await data?.save();

  res
    .status(200)
    .send({ success: true, data, message: `update ${msgName} successfully` });
};

export const deleteHomeInformation = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, Information, msgName);
  await Information.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: `delete ${msgName} successfully`,
  });
};
