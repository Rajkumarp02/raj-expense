import express from 'express'
const router = express.Router();
import { forgetPw, login,reset,resetPw,signup } from '../controller/auth.js';


router.post('/signup',signup)//post-signup
router.post('/login',login)//post-login
router.post('/forgetPw',forgetPw)//post-forget

router.post('/reset-password/:id/:token',reset)//post-resetpw

router.get('/reset-password/:id/:token',resetPw)//get-resetpw


export default router;