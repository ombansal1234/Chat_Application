import express from "express";

import { getUsersForSidebar,getMessages,sendMessage } from "../controllers/message.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router ();
router.get("/users", protectedRoute, getUsersForSidebar)
router.get("/:id", protectedRoute, getMessages)

router.route('/:id').post(protectedRoute,sendMessage).get(protectedRoute,getMessages);

export default router;