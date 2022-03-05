import { DoctorNote } from "../../model/about/doctors-note";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";

const commonName = "doctor's notes";

export const getDoctorsNotes = async (_: Request, res: Response) => {
  const stocks = await DoctorNote.find();
  
  res.status(200).send({
    success: true,
    data: stocks,
  });
};


export const addDoctorsNotes = async (req: Request, res: Response) => {
  const { name, note, position } = req.body;
  const createModelData = DoctorNote.build({
    name,
    note,
    position
  });

  const data = await createModelData.save();
  res.status(201).send({
    success: true,
    data,
    message: `create ${commonName} successfully`,
  });
};

export const updateDoctorNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bodyData = req.body;

  const data = await findDataByIdHelper(id, DoctorNote, commonName);

  await data?.set({
    name: bodyData["name"],
    note: bodyData["note"],
    position: bodyData["position"],
  });

  await data?.save();

  res.status(200).send({
    success: true,
    data,
    message: `update ${commonName} successfully`,
  });
};

export const deleteDoctorNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, DoctorNote, commonName);
  await DoctorNote.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: `delete ${commonName} successfully`,
  });
};
