import {Component, OnInit, TemplateRef} from '@angular/core';
import {BlogInfo} from 'src/app/domain/bloginfo.domain';
import {BlogInfoMgeSvr} from '../../service/blog-info-mge.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormControl, Validators} from '@angular/forms';
import {TYPE_OF_BLOG} from '../../domain/global.enum';
import {LoginAuthorService} from '../../service/login-author.service';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Util} from '../../share/class/util';
import {TypeMeaningService} from '../../service/type-meaning.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  public typeControl = new FormControl('', [Validators.min(1)]);
  public titleControl = new FormControl('', [Validators.required]);
  public stateControl = new FormControl('', [Validators.min(1)]);
  public blogInfo: BlogInfo = new BlogInfo({
    content: '# 新标题',
    title: '新标题',
    createTime: Util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
  });
  public modalRef: BsModalRef;
  public isLoading: boolean;
  public id: string;

  constructor(
    private modalSvr: BsModalService,
    private blogInfoMgeSvr: BlogInfoMgeSvr,
    private loginSvr: LoginAuthorService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private typeMeaningService: TypeMeaningService,
  ) {
    router.events.subscribe(Event => {
      this.isLoading = true;
      if (Event instanceof NavigationEnd) {
        if (!this.id || this.id !== this.route.snapshot.paramMap.get('id')) {
          this.id = this.route.snapshot.paramMap.get('id');
          if (this.id) {
            this.getShowInfo();
          }
        }
      }
    });
  }

  ngOnInit() {

  }


  /**
   * 获取要修改的数据
   */
  public getShowInfo(): void {
    this.blogInfoMgeSvr.Get(this.id).then(res => {
      this.blogInfo = res;
    });
  }

  /**
   * 修改或添加博客
   */
  public addOrUpdateBlogInfo(): void {
    if (this.id) {
      this.updateBlogInfo();
    } else {
      this.addBlogInfo();
    }
  }

  /**
   * 添加博客
   */
  public addBlogInfo(): void {
    this.blogInfoMgeSvr.Add(this.loginSvr.token, this.blogInfo).then(res => {
      if (res.id) {
        this.snackBar.open('添加成功', '', {duration: 2000});
        this.router.navigateByUrl('/details/' + res.id).then(() => {
          this.modalRef.hide();
        });
      } else {
        this.snackBar.open('添加失败', '', {duration: 2000});
      }
    }, err => {
      this.snackBar.open('添加失败', '', {duration: 2000});
    });
  }

  /**
   * 修改博客
   */
  public updateBlogInfo(): void {
    this.blogInfoMgeSvr.Update(this.loginSvr.token, this.id, this.blogInfo).then(res => {
      if (res.id) {
        this.snackBar.open('修改成功', '', {duration: 2000});
        this.router.navigateByUrl('/details/' + res.id).then(() => {
          this.modalRef.hide();
        });
      } else {
        this.snackBar.open('修改失败', '', {duration: 2000});
      }
    }, err => {
      this.snackBar.open('修改失败', '', {duration: 2000});
    });
  }

  /**
   * 展示模态框
   */
  public showAddBlogInfo(modal: TemplateRef<any>): void {
    this.modalRef = this.modalSvr.show(modal, {backdrop: 'static'});
  }

  /**
   * 获取类型含义
   */
  public getTypeContent(type: number): string {
    return TYPE_OF_BLOG[type];
  }

  /**
   * 获取类型列表
   */
  public getTitle(): number[] {
    return this.typeMeaningService.getTitle();
  }
}
