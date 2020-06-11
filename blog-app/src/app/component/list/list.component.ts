import {Component, OnInit} from '@angular/core';
import {BlogInfo} from '../../domain/bloginfo.domain';
import {BlogInfoMgeSvr} from '../../service/blog-info-mge.service';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {TypeMeaningService} from '../../service/type-meaning.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  public blogs: BlogInfo[] = [];
  public type: string;
  public isLoading: boolean;
  public pageCount = 1;
  public pageNow = 1;
  public pageSize = 15;
  public keyword = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogInfoMgeSvr: BlogInfoMgeSvr,
    private typeMeaningService: TypeMeaningService,
    private titleService: Title,
  ) {

    router.events.subscribe(Event => {
      this.isLoading = true;
      this.route.queryParams.subscribe((params: Params) => {
        this.keyword = params.key || '';
      });
      if (Event instanceof NavigationEnd) {
        const typeStr = this.route.snapshot.paramMap.get('type');
        const type = Number.parseInt(typeStr, 10);
        if (typeStr === 'other') {
          this.type = this.typeMeaningService.getNoShowType();
          this.titleService.setTitle('其他');
        } else if (!type) {
          this.type = '';
          this.titleService.setTitle('全部');
        } else if (!this.type || this.type !== type.toString()) {
          this.type = type.toString();
          this.titleService.setTitle(this.typeMeaningService.getTypeName(Number.parseInt(this.type, 10)));
        }
        this.getBlogList();
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
    this.blogInfoMgeSvr.QueryList((this.pageNow - 1) * this.pageSize, this.pageSize, this.type, this.keyword).then(res => {
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
    if (!this.type) {
      return '全部';
    } else if (this.type.includes(',')) {
      return '其他';
    }
    return this.typeMeaningService.getTypeName(Number.parseInt(this.type, 10));
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
