import {Component, OnInit} from '@angular/core';
import {TYPE_OF_BLOG} from '../../domain/global.enum';
import {TypeMeaningService} from 'src/app/service/type-meaning.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.less']
})
export class ContainerComponent implements OnInit {

  public isOpen: boolean;

  constructor(
    private typeMeaningService: TypeMeaningService,
  ) {
  }

  ngOnInit() {
  }

  /*
  * 获取类型名称
  * */
  public getName(type: number): string {
    return TYPE_OF_BLOG[type];
  }


  /*
  * 获取标题列表
  * */
  public getTitle(): number[] {
    return this.typeMeaningService.getTitle();
  }
}
