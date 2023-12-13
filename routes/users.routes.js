import express from "express";
import { login, register } from "../controllers/users.controller.js";
import verifytoken from "../middlewares/verifyToken.js";

const router = express.Router();

const test = () => {
  console.log("test");
};

router.post("/login", login, () => {
  console.log("test");
});
router.post("/register", register);
router.get("/verify", verifytoken, (req, res) => {
  res.sendStatus(201);
});

export default router;
