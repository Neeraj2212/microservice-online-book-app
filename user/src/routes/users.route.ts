import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateOrUpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.usersController.getUsers);
    this.router.post('/', validationMiddleware(CreateOrUpdateUserDto, 'body'), this.usersController.createUser);

    this.router.get('/:id', this.usersController.getUserById);
    this.router.put('/:id', validationMiddleware(CreateOrUpdateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete('/:id', this.usersController.deleteUser);

    this.router.get('/token/:id', this.usersController.getUserToken);
  }
}

export default UsersRoute;
