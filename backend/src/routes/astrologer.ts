import express from "express";
import {
  deleteOne,
  getAll,
  getOne,
  register,
  update,
} from "../controllers/astrologer";
const router = express.Router();

router.post("/register", register);
router.put("/:id", update);
router.delete("/:id", deleteOne);
router.get("/", getAll);
router.get("/:id", getOne);

export default router;
