import { Router } from "express";
import { signUp , signIn} from "../Controllers/authController.js";

const router = new Router();

 router.route('/sign-up').post(signUp)
 router.route('/sign-in').post(signIn)

 export default router;