import express from "express";
import { createSlot, getSlots, updateSlot, deleteSlot } from "../controllers/slotController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getSlots).post(authMiddleware, createSlot);
router.route("/:id").put(authMiddleware, updateSlot).delete(authMiddleware, deleteSlot);

export default router;
