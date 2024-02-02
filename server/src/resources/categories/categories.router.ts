import { Router } from "express";
import { createCat, deleteCat, getCats, getCat } from "./categories.controller";
import { catJoiSchema } from "./categories.model";
import { validate } from "../_middlewares/validate.schema";
import { formatData } from "../_middlewares/format.data";
import { authorize } from "../_middlewares/authorize";

export const categoryRouter = Router();

categoryRouter.get("/", getCats);
categoryRouter.get("/:id", getCat);
categoryRouter.post(
  "/create",
  authorize,
  validate(catJoiSchema),
  formatData,
  createCat
);
categoryRouter.delete("/:id", authorize, deleteCat);