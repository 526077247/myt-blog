import {Component, OnInit} from '@angular/core';
import {BlogInfo} from '../../domain/bloginfo.domain';
import {BlogInfoMgeSvr} from '../../service/blog-info-mge.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TYPE_OF_BLOG} from '../../domain/global.enum';
import {TypeMeaningService} from '../../service/type-meaning.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  public blogs: BlogInfo[] = [];
  public type: number;
  public isLoading: boolean;
  public pageCount = 1;
  public pageNow = 1;
  public pageSize = 15;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogInfoMgeSvr: BlogInfoMgeSvr,
    private typeMeaningService: TypeMeaningService,
  ) {
    router.events.subscribe(Event => {
      this.isLoading = true;
      if (Event instanceof NavigationEnd) {
        const type = Number.parseInt(this.route.snapshot.paramMap.get('type'), 10);
        if (!this.type || this.type !== type) {
          this.type = type;
          this.getBlogList();
        }
      }
    });
  }

  ngOnInit() {

  }

  /*
  * 取文章列表
  * */
  public getBlogList(): void {
    this.checkPage();
    this.blogInfoMgeSvr.QueryList((this.pageNow - 1) * this.pageSize, this.pageSize, this.type ? this.type.toString() : '').then(res => {
      this.blogs = res.list;
      this.pageSize = res.pageSize;
      this.isLoading = false;
      this.pageCount = Math.ceil(res.total / this.pageSize);
      this.checkPage();
    });
  }

  /*
  * 跳转展示页面
  * */
  public showblog(blog: BlogInfo): void {
    this.router.navigateByUrl('/details/' + blog.id);
  }

  /*
   * 跳转页面
   * */
  public changePage(n: number): void {
    this.pageNow = n;
    this.isLoading = true;
    this.getBlogList();
  }

  /*
  * 计算要展示的页码列表
  * */
  public getShowNum(): number[] {
    const result = [];
    let start = this.pageNow - 4;
    let end = this.pageNow + 4;
    if (this.pageCount > 9) {
      if (end > this.pageCount) {
        start = this.pageCount - 9;
        end = this.pageCount;
      } else if (start < 1) {
        start = 1;
        end = 9;
      }
    } else {
      start = 1;
      end = this.pageCount;
    }
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  /*
  * 获取展示图标
  * */
  public getIconClass(blog: BlogInfo): string {
    return this.typeMeaningService.getTypeIcon(blog.type);
  }

  /*
    * 取展示名称
    * */
  public getShowName(): string {
    return TYPE_OF_BLOG[this.type];
  }

  /*
  * 检测页码是否超出界限
  * */
  private checkPage(): void {
    if (this.pageCount < 1) {
      this.pageCount = 1;
    }
    if (this.pageNow < 1) {
      this.pageNow = 1;
    }
    if (this.pageNow > this.pageCount) {
      this.pageNow = this.pageCount;
    }
  }
}
