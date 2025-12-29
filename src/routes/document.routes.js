import express from "express";
import {
  uploadDocument,
  hrActionDocument,
  accountantDocument,
  resubmitDocument,
  getAllDocuments,
  getUserDocuments
} from "../controllers/document.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import upload from "../middleware/multer.middleware.js";

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

// resubmission of document by user after rejection
router.post(
  "/resubmit/:documentId",
  authenticate,
  authorizeRoles("user"),
  upload.single("file"),
  resubmitDocument
);
export default router;

// View all documents 
router.get(
  "/all",
  authenticate,
  authorizeRoles("hr", "accountant"),
  getAllDocuments
);

// User views his own documents
router.get(
  "/my-documents",
  authenticate,
  authorizeRoles("user"),
  getUserDocuments
);

// 