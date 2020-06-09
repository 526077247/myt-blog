/* Angular Version 6 below need to be deleted {providedIn: 'root'} */
/* angular */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Result} from '../domain/result.domain';
/* owner */
import {BlogInfo} from '../domain/bloginfo.domain';
import {DataList} from '../domain/datalist.domain';

@Injectable({
  providedIn: 'root'
})
export class BlogInfoMgeSvr {
  baseurl: string;
  header: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.baseurl = '/api/BlogInfoMgeSvr.rsfs/';
    this.header = new HttpHeaders().append('Urlencode-Type', 'PS1801');
  }

  Add(token: string, blogInfo: BlogInfo): Promise<BlogInfo> {
    return new Promise((resolve, reject) => {
      const httpParams = new HttpParams()
        .append('token', token || '')
        .append('blogInfo', JSON.stringify(blogInfo));
      this.httpClient.post<Result>(this.baseurl + 'Add', httpParams, {headers: this.header}).subscribe(res => {
        if (res.code !== 0) {
          reject(res.msg);
        } else {
          resolve(new BlogInfo(res.data));
        }
      }, err => {
        reject(err);
      });
    });
  }

  Update(token: string, id: string, blogInfo: BlogInfo): Promise<BlogInfo> {
    return new Promise((resolve, reject) => {
      const httpParams = new HttpParams()
        .append('token', token || '')
        .append('id', id || '')
        .append('blogInfo', JSON.stringify(blogInfo));
      this.httpClient.post<Result>(this.baseurl + 'Update', httpParams, {headers: this.header}).subscribe(res => {
        if (res.code !== 0) {
          reject(res.msg);
        } else {
          resolve(new BlogInfo(res.data));
        }
      }, err => {
        reject(err);
      });
    });
  }

  Delete(token: string, id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const httpParams = new HttpParams()
        .append('token', token || '')
        .append('id', id || '');
      this.httpClient.post<Result>(this.baseurl + 'Delete', httpParams, {headers: this.header}).subscribe(res => {
        if (res.code !== 0) {
          reject(res.msg);
        } else {
          resolve(res.data as number);
        }
      }, err => {
        reject(err);
      });
    });
  }

  Get(id: string): Promise<BlogInfo> {
    return new Promise((resolve, reject) => {
      const httpParams = new HttpParams()
        .append('id', id || '');
      this.httpClient.post<Result>(this.baseurl + 'Get', httpParams, {headers: this.header}).subscribe(res => {
        if (res.code !== 0) {
          reject(res.msg);
        } else {
          resolve(new BlogInfo(res.data));
        }
      }, err => {
        reject(err);
      });
    });
  }

  QueryList(start: number, pageSize: number, types: string, key?: string, createTimeS?: string, createTimeE?: string): Promise<DataList> {
    return new Promise((resolve, reject) => {
      let httpParams = new HttpParams()
        .append('start', start.toString())
        .append('pageSize', pageSize.toString())
        .append('types', types || '');
      if (key !== undefined) {
        httpParams = httpParams.append('key', key || '');
      }
      if (createTimeS !== undefined) {
        httpParams = httpParams.append('createTimeS', createTimeS || '');
      }
      if (createTimeE !== undefined) {
        httpParams = httpParams.append('createTimeE', createTimeE || '');
      }
      this.httpClient.post<Result>(this.baseurl + 'QueryList', httpParams, {headers: this.header}).subscribe(res => {
        if (res.code !== 0) {
          reject(res.msg);
        } else {
          resolve(new DataList(res.data));
        }
      }, err => {
        reject(err);
      });
    });
  }

  GetAdjacentBlogInfo(blogInfo: BlogInfo): Promise<DataList> {
    return new Promise((resolve, reject) => {
      const httpParams = new HttpParams()
        .append('blogInfo', JSON.stringify(blogInfo));
      this.httpClient.post<Result>(this.baseurl + 'GetAdjacentBlogInfo', httpParams, {headers: this.header}).subscribe(res => {
        if (res.code !== 0) {
          reject(res.msg);
        } else {
          resolve(new DataList(res.data));
        }
      }, err => {
        reject(err);
      });
    });
  }
}
