import { Router } from 'express';
import UserController from '@controllers/user.controller';
import { CreateUserDto, UpdateUserDto } from '@/dtos/user.dtos';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/all', this.userController.getUsers);
    this.router.post('/', validationMiddleware(CreateUserDto, 'body'), this.userController.createUser);

    this.router.get('/:id', this.userController.getUserById);
    this.router.put('/:id', validationMiddleware(UpdateUserDto, 'body', true), this.userController.updateUser);
    this.router.delete('/:id', this.userController.deleteUser);

    this.router.get('/token/:id', this.userController.getUserToken);
  }
}

export default UsersRoute;
