import { NextFunction, Request, Response } from "express";
import { TagModel } from "./tags.model";

/* CRUD OPERATIONS FOR TAG
 *  getTags, getTag, createTag, deleteTag
 */

export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await TagModel.find();
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

export const getTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tag = await TagModel.findOne({ _id: req.params.id });
    if (!tag) {
      return res.status(404).json({ error: "Unknown ID" });
    }

    res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};

export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingTag = await TagModel.findOne(req.body);
    if (!existingTag) {
      const newTag = await TagModel.create(req.body);
      res.status(201).json(newTag);
    } else {
      res.status(404).json(req.body.tag + " already created");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await TagModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("tag deleted");
  } catch (error) {
    next(error);
  }
};
