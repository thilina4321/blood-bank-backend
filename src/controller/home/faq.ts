import { Faq } from "../../model/home/faq";
import { Request, Response } from "express";
import { findDataByIdHelper } from "../common";

export const getHomeFaqs = async (_: Request, res: Response) => {
  const data = await Faq.find();
  res.status(200).send({
    success: true,
    data,
    message: "faqs fetch successfully",
  });
};

export const addHomeFaqs = async (req: Request, res: Response) => {
  const { question, answer } = req.body;
  const createModelData = await Faq.build({
    question,
    answer,
  });

  const data = await createModelData.save();
  res
    .status(201)
    .send({ success: true, data, message: "create faq successfully" });
};

export const updateHomeFaq = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  const data = await findDataByIdHelper(id, Faq, "faq");

  await data?.set({ question, answer });

  await data?.save();

  res
    .status(200)
    .send({ success: true, data, message: "update faq successfully" });
};

export const deleteHomeFaq = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findDataByIdHelper(id, Faq, "faq");
  await Faq.findByIdAndDelete(id);

  res.status(200).send({
    success: true,
    data: null,
    message: "delete faq successfully",
  });
};
