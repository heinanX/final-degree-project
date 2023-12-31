"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagRouter = void 0;
const express_1 = require("express");
const validateSchema_1 = require("../_middlewares/validateSchema");
const isAdmin_1 = require("../_middlewares/isAdmin");
const formatData_1 = require("../_middlewares/formatData");
const tagsController_1 = require("./tagsController");
const tagsModel_1 = require("./tagsModel");
exports.tagRouter = (0, express_1.Router)();
exports.tagRouter.get('/', tagsController_1.getTags);
exports.tagRouter.get('/:id', tagsController_1.getTag);
exports.tagRouter.post('/create', isAdmin_1.isAdmin, (0, validateSchema_1.validate)(tagsModel_1.tagJoiSchema), formatData_1.formatData, tagsController_1.createTag);
exports.tagRouter.delete('/:id', isAdmin_1.isAdmin, tagsController_1.deleteTag);
