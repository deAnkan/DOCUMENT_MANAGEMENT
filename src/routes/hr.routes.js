import express from "express";
import { getUsersAndAccountants, getAllDocumentsForHr } from "../controllers/hr.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/users",
  authenticate,
  authorizeRoles("hr"),
  getUsersAndAccountants   

);


router.get(  
 "/all-documents",
  authenticate,
  authorizeRoles("hr"),
  getAllDocumentsForHr
);

export default router;