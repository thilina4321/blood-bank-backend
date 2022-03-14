import { Contact } from "../../model/contact/contact";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";

const msgName = 'contact'

export const getContactDetails = async (_: Request, res: Response) => {
  const data = await Contact.find();
  res.status(200).send({
    success: true,
    data,
    message: `${msgName} fetch successfully`,
  });
};

export const addContactDetails = async (req: Request, res: Response) => {
  const { title, description, phoneNumber, fax, email } = req.body;
  const createModelData = Contact.build({
    title,
    description,
    email,
    phoneNumber,
    fax,
  });

  const data = await createModelData.save();
  res
    .status(201)
    .send({ success: true, data, message: `create ${msgName} successfully` });
};

export const updateContactDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, phoneNumber, fax, email } = req.body;

  const data = await findDataByIdHelper(id, Contact, msgName);

  await data?.set({ title, description, phoneNumber, fax, email });

  await data?.save();

  res
    .status(200)
    .send({ success: true, data, message: `update ${msgName} successfully` });
};

export const deleteContactDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, Contact, msgName);
  await Contact.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: `delete ${msgName} successfully`,
  });
};
