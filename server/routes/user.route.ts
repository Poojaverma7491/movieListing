import { Router } from 'express'
import { registerUserController, verifyEmailController, loginController, logoutController, getLoggedInUserController, googleOAuthCallbackController} from '../controllers/user.controller.ts'
import auth from '../middleware/auth.ts'

const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)
userRouter.get('/logout',auth,logoutController)
userRouter.get('/', auth, getLoggedInUserController);
userRouter.post('/google-login', googleOAuthCallbackController);

export default userRouter