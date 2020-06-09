import {Component, OnInit} from '@angular/core';
import {BlogInfo} from '../../domain/bloginfo.domain';
import {MatSnackBar} from '@angular/material';
import {Title} from '@angular/platform-browser';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public blogInfo: BlogInfo = new BlogInfo();
  public keyword = '';

  constructor(
    private snackBar: MatSnackBar,
    private titleService: Title,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('泊');
  }

  pageChange() {
    this.router.navigateByUrl('/list?key=' + this.keyword);
  }

  /*
  * 按键触发
  * */
  public selectParaChange(e) {
    // tslint:disable-next-line: deprecation
    const keycode = window.event ? e.keyCode : e.which;
    if (keycode === 13) {// 回车键
      this.pageChange();
    }
  }
}
