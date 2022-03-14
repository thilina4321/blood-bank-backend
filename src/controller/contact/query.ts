import { Query } from "../../model/contact/query";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";

const msgName = 'contact query'

export const getContactQuery = async (_: Request, res: Response) => {
  const data = await Query.find();
  res.status(200).send({
    success: true,
    data,
    message: `${msgName} fetch successfully`,
  });
};

export const addContactQuery = async (req: Request, res: Response) => {
  const { fullName, message , phoneNumber, email } = req.body;
  const createModelData = Query.build({
    fullName,
    message,
    email,
    phoneNumber,
  });

  const data = await createModelData.save();
  res
    .status(201)
    .send({ success: true, data, message: `create ${msgName} successfully` });
};


export const deleteContactQuuery = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, Query, msgName);
  await Query.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: `delete ${msgName} successfully`,
  });
};
