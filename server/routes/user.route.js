import Express from 'express';
import ExpressValidation from 'express-validation';

import UserController from '../controllers/user.controller';
import ParamValidation from '../helpers/param.validation';

const router = Express.Router();
const userController = new UserController();

router.route('/login')
    .post(ExpressValidation(ParamValidation.login),userController.login);

router.route('/')
    .get(userController.count)
    .post(userController.create);

router.route('/:id')
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.delete);

export default router;