import { Stock } from "../../model/blood-bank/stocks";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";

const commonName = "stock";

export const getBloodStocks = async (_: Request, res: Response) => {
  const stocks = await Stock.find();
  res.status(200).send({
    success: true,
    data: stocks,
  });
};

export const getOneBloodStocks = async (req: Request, res: Response) => {
  const { id } = req.params;
  const stock = await findDataByIdHelper(id, Stock, "stock");
  res.status(200).send({
    success: true,
    data: stock,
  });
};

export const addBloodStocks = async (req: Request, res: Response) => {
  const { type, amount, neededAmount } = req.body;
  const createModelData = Stock.build({
    type,
    amount,
    neededAmount,
  });

  const data = await createModelData.save();
  res.status(201).send({
    success: true,
    data,
    message: `create ${commonName} successfully`,
  });
};

export const updateBloodStocks = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bodyData = req.body;

  const data = await findDataByIdHelper(id, Stock, commonName);

  await data?.set({
    type: bodyData["type"],
    amount: bodyData["amount"],
    neededAmount: bodyData["neededAmount"],
  });

  await data?.save();

  res.status(200).send({
    success: true,
    data,
    message: `update ${commonName} successfully`,
  });
};

export const deleteBloodStocks = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, Stock, commonName);
  await Stock.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: `delete ${commonName} successfully`,
  });
};
