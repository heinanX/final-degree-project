import { NextFunction, Request, Response } from "express";
import { CategoryModel } from "./categories.model";

// CONTROLLER TO GET ALL CATEGORIES
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

// CONTROLLER TO GET A SPECIFIC CATEGORY BY ID
export const getCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await CategoryModel.findOne({ _id: req.params.id });

    // Check if the category with the provided ID exists
    if (!category) {
      return res.status(404).json({ error: 'Unknown ID' });
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// CONTROLLER TO CREATE A NEW CATEGORY
export const createCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if the category already exists
    const checkCat = await CategoryModel.findOne(req.body);

    if (!checkCat) {
      // If the category does not exist, create a new category
      const newCategory = await CategoryModel.create(req.body);
      res.status(201).json(newCategory);
    } else {
      // If the category already exists, respond with an error message
      res.status(404).json(req.body.category + ' already created');
    }
  } catch (error) {
    next(error);
  }
};

// MIDDLEWARE TO DELETE A CATEGORY BY ID
export const deleteCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Find and delete the category with the provided ID
    await CategoryModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json('category deleted');
  } catch (error) {
    next(error);
  }
};
