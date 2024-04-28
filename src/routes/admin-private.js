import express from "express";
import adminController from "../controllers/admin-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import permision from "../controllers/permision.js";
import activityController from "../controllers/activity-controller.js";
import userController from "../controllers/user-controller.js";

const router = express.Router();
router.post("/", authMiddleware.adminCreateSecurity, adminController.create);
router.post("/login", adminController.login);

router.use(authMiddleware.admin);
router.get("/", adminController.get);
router.get("/permision", permision);
router.get("/activitys", activityController.adminGet);
router.get("/users", userController.adminGet);

export default router;
