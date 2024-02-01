import { NextFunction, Request, Response } from 'express';
import { TagModel } from './tags.model';

// Get all tags
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

// Get a specific tag by ID
export const getTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tag = await TagModel.findOne({ _id: req.params.id });
    if (!tag) {
      return res.status(404).json({ error: 'Unknown ID' });
    }

    res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};

// Create a new tag
export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if the tag already exists
    const checkTag = await TagModel.findOne(req.body);
    if (!checkTag) {
      // If the tag doesn't exist, create a new one
      const newTag = await TagModel.create(req.body);
      res.status(201).json(newTag);
    } else {
      // If the tag already exists, respond with an error message
      res.status(404).json(req.body.tag + ' already created');
    }
  } catch (error) {
    next(error);
  }
};

// Delete a tag by ID
export const deleteTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Find and delete the tag from the database
    await TagModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json('tag deleted');
  } catch (error) {
    next(error);
  }
};