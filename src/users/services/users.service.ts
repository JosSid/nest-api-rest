import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getHello() {
    return 'Hello world users';
  }
}
