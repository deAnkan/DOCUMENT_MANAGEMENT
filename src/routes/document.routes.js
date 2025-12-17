import express from "express";
import {
  uploadDocument,
  hrActionDocument,
  accountantDocument
} from "../controllers/document.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {upload} from "../middleware/multer.middleware.js";

const router = express.Router();

// USER uploads document
router.post(
  "/upload",
  authenticate,
  authorizeRoles("user"),
  upload.single("file"),
  uploadDocument
);

// HR approves / rejects
router.put(
  "/hr-action/:documentId",
  authenticate,
  authorizeRoles("hr"),
  hrActionDocument
);

// ACCOUNTANT releases amount
router.put(
  "/accountant-action/:documentId",
  authenticate,
  authorizeRoles("accountant"),
  accountantDocument
);

export default router;
