import express from "express";
import { signUp, signIn, verifyOtp } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Auth routes
router.post("/signup", signUp);
router.post("/verify-otp", verifyOtp);
router.post("/signin", signIn);

router.post("/signout", (req, res) => {
  // Token invalidation handled on client side
  res.json({ message: "Signed out successfully" });
});

// Protected routes
router.get("/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});

router.get(
  "/hr-only",
  authenticate,
  authorizeRoles(["hr"]),
  (req, res) => {
    res.json({ message: "Welcome HR" });
  }
);

export default router;

