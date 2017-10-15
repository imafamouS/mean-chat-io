import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  jwtHelper: JwtHelper = new JwtHelper();

  currentUser = { _id: '', username: '', role: '' };

  constructor(private userService: UserService,
    private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(usernameAndPassword) {
    return this.userService.login(usernameAndPassword).map(res => res.json()).map(
      res => {
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          const decodedUser = this.decodeUserFromToken(res.data.token);
          this.setCurrentUser(decodedUser);
          this.loggedIn = true;
          return this.loggedIn;
        }else{
           throw new Error('Username or password is wrong !');
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = { _id: '', username: '', role: '' };
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
  }
}
