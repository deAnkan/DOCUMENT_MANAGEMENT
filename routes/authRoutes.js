import express from "express";
import { signUp, signIn } from "../controllers/authcontroller.js";
import { authenticate } from "../middleware/authmiddleware.js";
import { authorizeRoles } from "../middleware/rolemiddleware.js";

const router = express.Router();


router.post("/signup", signUp);
router.post("/signin", signIn);


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




