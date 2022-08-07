import { Router } from "express";
import passport from "passport";
import { login } from "../controllers/Auth";
const router = Router()

router.get('/google', passport.authenticate('google'))
router.get('/google/callback', passport.authenticate('google', { failureRedirect : '/login/failed'}), (req, res)=>{
    res.status(200).json({
        msg : "Success"
    })
})

router.post('/login', login)


export default router