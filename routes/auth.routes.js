import express from "express";
import { signup, signin } from "../controllers/authController.js";
import { authenticate } from "../middleware?/authMiddleware.js";
import { authorizeRoles } from "../middleware?/roleMiddleware.js";

const router = express.Router();


router.post("/signup", signup);
router.post("/signin", signin);


router.get("/profile", authenticate, (req, res) => {
 
  res.json({ ok: true, user: req.user });
});


router.get("/hr-only", authenticate, authorizeRoles(["hr"]), (req, res) => {
  res.json({ ok: true, message: "Welcome HR", user: req.user });
});


router.get("/accountant-only", authenticate, authorizeRoles(["accountant"]), (req, res) => {
  res.json({ ok: true, message: "Welcome Accountant" });
});


router.get("/payroll", authenticate, authorizeRoles(["hr", "accountant"]), (req, res) => {
  res.json({ ok: true, message: "Payroll access", role: req.user.role });
});

export default router;




