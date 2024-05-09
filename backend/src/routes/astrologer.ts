import express from "express";
import { deleteOne, getAll, register, update } from "../controllers/astrologer";
const router = express.Router();

router.post("/register", register);
router.put("/:id", update);
router.delete("/:id", deleteOne);
router.get("/", getAll);

export default router;
