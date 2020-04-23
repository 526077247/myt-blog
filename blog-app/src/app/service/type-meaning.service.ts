import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Result} from '../domain/result.domain';
import {LoginResult} from '../domain/loginresult.domain';

@Injectable({
  providedIn: 'root'
})
export class TypeMeaningService {
  baseurl: string;
  private titles: number[] = [];
  private titleJson: any[] = [];

  constructor(private httpClient: HttpClient) {
    this.baseurl = '/api/type.json';
    this.httpClient.get<any[]>(this.baseurl).subscribe(res => {
      this.titleJson = res;
    });
  }

  /**
   * 获取类型图标
   * @param type 类型
   */
  public getTypeIcon(type: number): string {
    for (const item of this.titleJson) {
      if (item.id === type) {
        return item.icon;
      }
    }
    return;
  }
  /**
   * 获取类型图标
   * @param type 类型
   */
  public getTypeName(type: number): string {
    for (const item of this.titleJson) {
      if (item.id === type) {
        return item.name;
      }
    }
    return;
  }
  /**
   * 获取类型列表
   */
  public getTitle(): number[] {
    if (this.titles.length > 0) {
      return this.titles;
    }
    const res = [];
    for (const item of this.titleJson) {
      res.push(item.id);
    }
    // tslint:disable-next-line:forin
    // for (const key in TYPE_OF_BLOG) {
    //   const keyToAny: any = key;
    //   if (isNaN(keyToAny)) {
    //     const anyType: any = TYPE_OF_BLOG[key];
    //     const typeEnum: TYPE_OF_BLOG = anyType;
    //     res.push(typeEnum);
    //   }
    // }
    this.titles = res;
    return res;
  }


}
