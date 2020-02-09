


/**
 *
 */
export class Result  {
  code: number; // 代码
  msg: string; // 消息
  data: any; // 返回数据

  constructor(options: {
    code?: number;
    msg?: string;
    data?: any;
  } = {}) {
    this.code = !options.code ? 0 : Number.parseFloat(options.code.toString());
    this.msg = options.msg || '';
    this.data = options.data || null;
  }
}

