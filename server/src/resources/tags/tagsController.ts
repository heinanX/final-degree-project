import { NextFunction, Request, Response } from "express";
import { TagModel } from "./tagsModel";

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
    const category = await TagModel.findOne({ _id: req.params.id });
    res.status(200).json(category);
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
    const checkTag = await TagModel.findOne(req.body);
    if (!checkTag) {
      const newTag = await TagModel.create(req.body);
      res.status(201).json(newTag);
    } else {
      res.status(404).json( req.body.tag + ' already created' );
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
    res.status(200).json( 'tag deleted' );
  } catch (error) {
    next(error);
  }
};