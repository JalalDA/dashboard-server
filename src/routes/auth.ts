import { Router } from "express";
import passport from "passport";
import { login, register, logout } from "../controllers/Auth";
import { verifyToken } from "../middlewares/verifytoken";
const router = Router();

router.get("/google", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  (req, res) => {
    res.status(200).json({
      msg: "Success",
    });
  }
);

router.post("/login", login);
router.post("/register", register);
router.delete("/logout", verifyToken, logout);

export default router;
