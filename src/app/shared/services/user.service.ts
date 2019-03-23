import {Injectable} from '@angular/core';
import {LocalStorage} from '../classes/LocalStorage';
import {User} from '../classes/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: User;

  constructor() {
  }

  initUser(user: User) {
    this.user = user;
    LocalStorage.saveObject('user', user);
  }

  getId(): string {
    return this.user.email;
  }
}
