"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const categoriesController_1 = require("./categoriesController");
const categoriesModel_1 = require("./categoriesModel");
const validateSchema_1 = require("../_middlewares/validateSchema");
const isAdmin_1 = require("../_middlewares/isAdmin");
const formatData_1 = require("../_middlewares/formatData");
exports.categoryRouter = (0, express_1.Router)();
exports.categoryRouter.get('/', categoriesController_1.getCats);
exports.categoryRouter.get('/:id', categoriesController_1.getCat);
exports.categoryRouter.post('/create', isAdmin_1.isAdmin, (0, validateSchema_1.validate)(categoriesModel_1.catJoiSchema), formatData_1.formatData, categoriesController_1.createCategory);
exports.categoryRouter.delete('/:id', isAdmin_1.isAdmin, categoriesController_1.deleteCat);
