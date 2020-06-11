


/**
 *
 */
export class Type  {
  name: string; // 名称
  id: number; // 编号
  icon: string; // 图标
  state: number; // 状态
  constructor(options: {
    name?: string;
    id?: number;
    icon?: string;
    state?: number
  } = {}) {
    this.name = options.name || '';
    this.id = !options.id ? 0 : Number.parseFloat(options.id.toString());
    this.icon = options.icon || '';
    this.state = !options.state ? 0 : Number.parseFloat(options.state.toString());
  }
}

