const userRouter = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validation');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validateUpdateUser, updateUserInfo);

module.exports = { userRouter };
