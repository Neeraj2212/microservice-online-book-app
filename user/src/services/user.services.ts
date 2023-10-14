import { SECRET_KEY } from '@/config';
import { CreateUserDto, UpdateUserDto } from '@/dtos/user.dtos';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData, User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { sign } from 'jsonwebtoken';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(404, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ $or: [{ email: userData.email }, { phone: userData.phone }] });
    if (findUser) {
      if (findUser.email === userData.email) throw new HttpException(409, `This email ${userData.email} already exists`);
      if (findUser.phone === userData.phone) throw new HttpException(409, `This phone ${userData.phone} already exists`);
    }
    const createUserData: User = await this.users.create(userData);

    return createUserData;
  }

  public async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    if (userData.email || userData.phone) {
      const findUser: User = await this.users.findOne({ $or: [{ email: userData.email }, { phone: userData.phone }] });
      if (findUser && findUser._id != userId) {
        if (findUser.email === userData.email) throw new HttpException(409, `This email ${userData.email} already exists`);
        if (findUser.phone === userData.phone) throw new HttpException(409, `This phone ${userData.phone} already exists`);
      }
    }
    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { $set: userData }, { returnOriginal: false });
    if (!updateUserById) throw new HttpException(404, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(404, "User doesn't exist");

    return deleteUserById;
  }

  public async createToken(userId: string): Promise<TokenData> {
    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(404, "User doesn't exist");

    const dataStoredInToken: DataStoredInToken = { _id: userId };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60 * 1000; // an hour

    return { token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default UserService;
