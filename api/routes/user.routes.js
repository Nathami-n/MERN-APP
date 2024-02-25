import { Router } from "express";
import { signUp } from "../Controllers/User.controllers.js";

const router = new Router();

 router.route('/').post(signUp)

 export default router;