import {Injectable} from '@angular/core';
import {TYPE_OF_BLOG} from '../domain/global.enum';

@Injectable({
  providedIn: 'root'
})
export class TypeMeaningService {

  private titles: number[] = [];

  constructor() {
  }

  /**
   * 获取类型图标
   * @param type 类型
   */
  public getTypeIcon(type: number): string {
    switch (type) {
      case 1:
        return 'icon-cpp';
      case 2:
        return 'icon-csharp';
      case 3:
        return 'icon-angular';
      case 4:
        return 'icon-mysql';
      case 5:
        return 'icon-nginx';
      case 6:
        return 'icon-u3d';
    }
  }

  /**
   * 获取类型列表
   */
  public getTitle(): number[] {
    if (this.titles.length > 0) {
      return this.titles;
    }
    const res = [];
    // tslint:disable-next-line:forin
    for (const key in TYPE_OF_BLOG) {
      const keyToAny: any = key;
      if (isNaN(keyToAny)) {
        const anyType: any = TYPE_OF_BLOG[key];
        const typeEnum: TYPE_OF_BLOG = anyType;
        res.push(typeEnum);
      }
    }
    this.titles = res;
    return res;
  }


}
