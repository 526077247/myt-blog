import {Component, OnInit} from '@angular/core';
import {LoginAuthorService} from '../../service/login-author.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';

  constructor(
    private loginSvr: LoginAuthorService
  ) {
  }

  ngOnInit() {
  }

  /**
   * 登录
   */
  public login(): void {
    this.loginSvr.login(this.username, this.password);
  }

  /*
  * 按键触发
  * */
  public selectParaChange(e) {
    // tslint:disable-next-line: deprecation
    const keycode = window.event ? e.keyCode : e.which;
    if (keycode === 13) {// 回车键
      this.login();
    }
  }
}
