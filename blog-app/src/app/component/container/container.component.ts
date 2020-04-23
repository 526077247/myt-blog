import {Component, OnInit} from '@angular/core';
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
    return this.typeMeaningService.getTypeName(type);
  }


  /*
  * 获取标题列表
  * */
  public getTitle(): number[] {
    return this.typeMeaningService.getTitle();
  }
}
