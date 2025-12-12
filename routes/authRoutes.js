import express from "express";
<<<<<<< HEAD:routes/auth.routes.js
import { signUp, signIn } from "../controllers/authController.js";
import { authenticate } from "../middleware/authmiddleware.js";
import { authorizeRoles } from "../middleware/rolemiddleware.js";
const router = express.Router();

=======
import { signUp, signIn } from "../controllers/authcontroller.js";
import { authenticate } from "../middleware/authmiddleware.js";
import { authorizeRoles } from "../middleware/rolemiddleware.js";

const router = express.Router();


>>>>>>> b69bdeb5c18196e52855ae9aafa4aa44d83b7f2e:routes/authRoutes.js
router.post("/signup", signUp);
router.post("/signin", signIn);


router.get("/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});

router.get("/hr-only", authenticate, authorizeRoles(["hr"]), (req, res) => {
  res.json({ message: "Welcome HR" });
});



export default router;
