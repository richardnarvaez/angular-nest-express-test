import { UserResponseModel } from 'src/shared/models/user.response.model';
import { User } from './user';

export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        email: 'prueba@gmail.com',
        firstName: 'richard',
        lastName: 'vinueza',
        id: 1,
        password: '1234567890',
        phone: '1234567890',
      },
    ];
  }

  async find(email: string): Promise<User> {
    return await this.users.find((_) => _.email == email);
  }
}
