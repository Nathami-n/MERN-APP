import { userHandler } from "../Controllers/userController.js";
import { Router } from "express";

const router = new Router();

router.route("/").get(userHandler);
export default router;
