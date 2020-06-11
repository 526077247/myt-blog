/**
 * 博客文章
 */
import {Util} from '../share/class/util';

export class BlogInfo {
  id: string; // 文章序列号
  title: string; // 文章标题
  content: string; // 内容
  createTime: string; // 时间
  type: number; // 类型
  state: number; // 状态
  auther: string; // 作者
  constructor(options: {
    id?: string;
    title?: string;
    content?: string;
    createTime?: string;
    type?: number;
    state?: number; // 状态
    auther?: string;
  } = {}) {
    this.id = options.id || '';
    this.title = options.title || '';
    this.content = options.content || '';
    this.createTime = options.createTime || Util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
    this.type = !options.type ? 0 : Number.parseFloat(options.type.toString());
    this.state = !options.state ? 0 : Number.parseFloat(options.state.toString());
    this.auther = options.auther || '';

  }
}
