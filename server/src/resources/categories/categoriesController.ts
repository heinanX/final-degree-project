import { NextFunction, Request, Response } from "express";
import { CategoryModel } from "./categoriesModel";

export const getCats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await CategoryModel.findOne({ _id: req.params.id });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkCat = await CategoryModel.findOne(req.body);
    if (!checkCat) {
      const newCategory = await CategoryModel.create(req.body);
      res.status(201).json(newCategory);
    } else {
      res.status(404).json( req.body.category + ' already created' );
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CategoryModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json( 'category deleted' );
  } catch (error) {
    next(error);
  }
};