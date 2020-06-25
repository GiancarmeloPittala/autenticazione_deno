import { Router, Context } from "https://deno.land/x/oak/mod.ts";
import userController from '../controllers/userController.ts';

export const router = new Router();

router 
  .get('/user/me', userController.login)
  .post('/user/register', userController.register)
  .post('/user/login', userController.login)
  


