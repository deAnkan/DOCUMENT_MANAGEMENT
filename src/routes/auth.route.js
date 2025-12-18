import express from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
const router = express.Router();


router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", (req, res) => {
  // Invalidate the token on client side
  res.json({ message: "Signed out successfully" });
});

router.get("/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});

router.get("/hr-only", authenticate, authorizeRoles(["hr"]), (req, res) => {
  res.json({ message: "Welcome HR" });
});



export default router;
