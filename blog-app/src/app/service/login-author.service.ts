import {Injectable} from '@angular/core';


import {CookieUtil} from '../share/class/cookie';
import {LoginResult} from '../domain/loginresult.domain';
import {Router} from '@angular/router';
import {LoginMgeSvr} from './login-mge.service';
import {MatSnackBar} from '@angular/material';


const SESSION_NAME = '_MytBlog_Session_Token_Info_';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthorService {

  cookie = new CookieUtil();

  constructor(
    private authorizeSvr: LoginMgeSvr,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  get userInfo() {
    const res = new LoginResult(JSON.parse(this.cookie.cookie(SESSION_NAME) || '{}'));
    if (!res.Token) {
      this.router.navigateByUrl('/login');
    }
    return res;
  }

  get token(): string {
    return this.userInfo.Token;
  }

  get isLogin(): boolean {
    const res = new LoginResult(JSON.parse(this.cookie.cookie(SESSION_NAME) || '{}'));
    return !!res.Token;
  }

  login(username: string, password: string): void {
    this.authorizeSvr.Login(username, password).then(res => {
      if (res.Token) {
        this.cookie.cookie(SESSION_NAME, JSON.stringify(res), {path: '/', expires: res.Effective});
        this.router.navigateByUrl('/edit');
        this.snackBar.open('登录成功', '', {duration: 2000});
      } else {
        this.snackBar.open('登录失败', '', {duration: 2000});
      }
    }, err => {
      this.snackBar.open('登录失败', '', {duration: 2000});
    });
  }

  logout(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authorizeSvr.Logout(this.token).then(res => {
        if (res) {
          this.cookie.cookie(SESSION_NAME, res, {path: '/', expires: 0});
          this.router.navigateByUrl('/login');
          resolve(true);
        } else {
          resolve(false);
        }
      }, err => {
        reject(err);
      });
    });

  }

}
