import { Location } from "../../model/blood-bank/location";
import { Request, Response } from "express";

export const getBloodBankLocations = async (_: Request, res: Response) => {
  const locations = Location.find();
  res.status(200).send({
    success: true,
    data: locations,
  });
};

export const addBloodBankLocation = async (_: Request, res: Response) => {
    
};
