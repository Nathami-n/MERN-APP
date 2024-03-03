import { Router } from "express";
import { signUp , signIn, googleAuthentication} from "../Controllers/authController.js";

const router = new Router();

 router.route('/sign-up').post(signUp)
 router.route('/sign-in').post(signIn)
 router.route('/googleAuth').post(googleAuthentication)

 export default router;