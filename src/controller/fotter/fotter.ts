import { Fotter } from "../../model/footer/footer";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";

const msgName = "fotter";

export const getFotter = async (_: Request, res: Response) => {
  const data = await Fotter.find();
  res.status(200).send({
    success: true,
    data,
    message: `${msgName} fetch successfully`,
  });
};

export const addFotter = async (req: Request, res: Response) => {
  const { title, url } = req.body;

  const createModelData = Fotter.build({
    title,
    url,
  });

  const data = await createModelData.save();
  res
    .status(201)
    .send({ success: true, data, message: `create ${msgName} successfully` });
};

export const updateFotter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, url } = req.body;

  const data = await findDataByIdHelper(id, Fotter, msgName);

  await data?.set({ title, url });

  await data?.save();

  res
    .status(200)
    .send({ success: true, data, message: `update ${msgName} successfully` });
};

export const deleteFotter = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, Fotter, msgName);
  await Fotter.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: `delete ${msgName} successfully`,
  });
};
