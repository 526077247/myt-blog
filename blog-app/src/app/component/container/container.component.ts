import {Component, OnInit} from '@angular/core';
import {TypeMeaningService} from 'src/app/service/type-meaning.service';
import {Type} from '../../domain/type.domain';

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
  public getTypes(): Type[] {
    return this.typeMeaningService.getTypes();
  }
}
