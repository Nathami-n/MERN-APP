import { Router } from "express";
import { signUp , signIn, googleAuthentication, updateUser} from "../Controllers/authController.js";

const router = new Router();

 router.route('/sign-up').post(signUp)
 router.route('/sign-in').post(signIn)
 router.route('/googleAuth').post(googleAuthentication)
 router.route('/profile/:id').put(updateUser);

 export default router;