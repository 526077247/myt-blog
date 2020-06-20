import {Component, OnInit} from '@angular/core';
import {BlogInfo} from '../../domain/bloginfo.domain';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BlogInfoMgeSvr} from '../../service/blog-info-mge.service';
import {MatSnackBar} from '@angular/material';
import {LoginAuthorService} from '../../service/login-author.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.less']
})
export class ShowComponent implements OnInit {
  public blogInfo: BlogInfo = new BlogInfo();
  public id: string;
  public isLoading: boolean;
  public preBlog: BlogInfo;
  public afterBlog: BlogInfo;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogInfoMgeSvr: BlogInfoMgeSvr,
    private loginSvr: LoginAuthorService,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) {
    router.events.subscribe(Event => {
      this.isLoading = true;
      if (Event instanceof NavigationEnd) {
        if (!this.id || this.id !== this.route.snapshot.paramMap.get('id')) {
          this.id = this.route.snapshot.paramMap.get('id');
          this.getShowInfo();
        }
      }
    });
  }

  ngOnInit() {
  }

  /*
  * 获取展示信息
  * */
  public getShowInfo(): void {
    if (!this.id) {
      this.router.navigateByUrl('/404');
    } else {
      this.blogInfoMgeSvr.Get(this.id).then(res => {
        if (!res.content) {
          this.router.navigateByUrl('/404');
        } else {
          this.blogInfo = res;
          this.titleService.setTitle(this.blogInfo.title);
          this.preBlog = null;
          this.afterBlog = null;
          this.blogInfoMgeSvr.GetAdjacentBlogInfo(res).then(res2 => {
            for (const item of res2.list) {
              if (item.createTime < res.createTime) {
                this.preBlog = item;
              } else if (item.createTime > res.createTime) {
                this.afterBlog = item;
              }
            }
            this.isLoading = false;
          });
        }
      }, err => {
        this.router.navigateByUrl('/404');
      });
    }
  }

  /*
  * 跳轉頁面
  * */
  public showDetails(blogInfo: BlogInfo): void {
    this.router.navigateByUrl('/details/' + blogInfo.id);
  }

  /**
   * 跳转修改页面
   */
  public edit(): void {
    this.router.navigateByUrl('/edit/' + this.id);
  }

  /**
   * 删除
   */
  public delete(): void {
    this.blogInfoMgeSvr.Delete(this.loginSvr.token, this.id).then(res => {
      if (res === 1) {
        this.router.navigateByUrl('/list/' + this.blogInfo.type).then(() => {
          this.snackBar.open('删除成功', '', {duration: 2000});
        });
      } else {
        this.snackBar.open('删除失败', '', {duration: 2000});
      }
    }, err => {
      this.snackBar.open('删除失败', '', {duration: 2000});
    });
  }

  /**
   * 是否登录
   */
  public isLogin(): boolean {
    return this.loginSvr.isLogin && this.loginSvr.userInfo.Name === this.blogInfo.auther;
  }
}
