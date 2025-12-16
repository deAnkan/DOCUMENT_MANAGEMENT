import express from "express";
import {
  uploadDocument,
  hrActionDocument,
  accontantDocument
} from "../controllers/document.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// USER uploads document
router.post(
  "/upload",
  authenticate,
  authorizeRoles("USER"),
  uploadDocument
);

// HR approves / rejects
router.put(
  "/hr-action/:documentid",
  authenticate,
  authorizeRoles("HR"),
  hrActionDocument
);

// ACCOUNTANT releases amount
router.put(
  "/accountant-action/:documentid",
  authenticate,
  authorizeRoles("ACCOUNTANT"),
  accontantDocument
);

export default router;
