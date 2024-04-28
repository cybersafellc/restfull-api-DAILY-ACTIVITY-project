import express from "express";
import userController from "../controllers/user-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import permision from "../controllers/permision.js";
import activityController from "../controllers/activity-controller.js";

const router = express.Router();
router.post("/", userController.create);
router.post("/login", userController.login);
router.use(authMiddleware.user);
router.get("/permision", permision);
router.post("/activity", activityController.create);
router.get("/activitys", activityController.get);
export default router;
