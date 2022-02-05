import { Location } from "../../model/blood-bank/location";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";
import { model } from "mongoose";

export const getBloodBankLocations = async (_: Request, res: Response) => {
  const locations = await Location.find();
  res.status(200).send({
    success: true,
    data: locations,
  });
};

export const addBloodBankLocation = async (req: Request, res: Response) => {
  const { name, imageUrl, latitude, longitude, description } = req.body;
  const createModelData = Location.build({
    name,
    imageUrl,
    latitude,
    longitude,
    description,
  });

  const data = await createModelData.save();
  res
    .status(201)
    .send({ success: true, data, message: "create location successfully" });
};

export const updateBloodBankLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bodyData = req.body;

  const existingData = await findDataByIdHelper(id, Location, "location");
  const data = await Location.findOneAndUpdate(
    { id },
    {
      ...existingData,
      ...bodyData,
    }
  );

  res
    .status(200)
    .send({ success: true, data, message: "update location successfully" });
};

export const deleteBloodBankLocations = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, Location, "location");
  await Location.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: "delete location successfully",
  });
};

// model.find({
//   _id: { $in: ["61fec98fd0f83062adde8ca6", "61fec9a8d0f83062adde8ca8"] },
// });
