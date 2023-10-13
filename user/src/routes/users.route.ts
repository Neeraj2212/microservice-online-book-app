import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateOrUpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.post(`${this.path}`, validationMiddleware(CreateOrUpdateUserDto, 'body'), this.usersController.createUser);

    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateOrUpdateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);

    this.router.get(`${this.path}/token/:id`, this.usersController.getUserToken);
  }
}

export default UsersRoute;
