import { Request, Response } from "express";
import Astrologer from "../models/astrologer";
import { astrologerSchema } from "../utils/validations";

export const register = async (req: Request, res: Response) => {
  const validateData = astrologerSchema.safeParse(req.body);
  if (!validateData.success) {
    res.status(500).json(validateData.error.flatten().fieldErrors);
    return;
  }
  // Checking for duplicate email
  const email = await Astrologer.findOne({ email: validateData.data.email });

  if (email) {
    res.status(500).json({ email: ["Email already exists"] });
    return;
  }
  const newAstro = new Astrologer(req.body);

  try {
    const savedAstro = await newAstro.save();

    res.status(200).json(savedAstro);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const update = async (req: Request, res: Response) => {
  const validateData = astrologerSchema.safeParse(req.body);
  if (!validateData.success) {
    res.status(500).json(validateData.error.flatten().fieldErrors);
    return;
  }
  try {
    const updatedAstro = await Astrologer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedAstro);
  } catch (err: any) {
    console.log(err);

    if (err.code === 11000 || err.code === 11001) {
      if (err.keyValue.email) {
        res.status(500).json({ email: ["Email already exists"] });
        return;
      }
    }
    res.status(500).json(err);
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const updatedUser = await Astrologer.findByIdAndDelete(req.params.id);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id);
    res.status(200).json(astrologer);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const astrologers = await Astrologer.find();
    res.status(200).json(astrologers);
  } catch (err) {
    res.status(500).json(err);
  }
};
