import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Lucas Alves',
      email: 'lukasalves271@gmail.com'
    }
  ];

  create(createUserDto: CreateUserDto) {
    const currentMaxId: number = this.users[this.users.length - 1]?.id || 0;
    const id: number = currentMaxId + 1;
    const user: User = {
      ...createUserDto,
      id
    };

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find(user => user.id === id);

    const newUser: User = {
      ...user,
      ...updateUserDto
    }

    const index = this.users.indexOf(user);
    this.users[index] = newUser;

    return newUser
  }

  remove(id: number) {
    const user = this.users.find(user => user.id === id);
    const index = this.users.indexOf(user);

    this.users.splice(index, 1);
  }
}
