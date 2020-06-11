using System;
using System.Collections.Generic;
using System.Text;

namespace Blog.Service
{
    /// <summary>
    /// 博客文章
    /// </summary>
    public class BlogInfo
    {
        /// <summary>
        /// 文章标识
        /// </summary>
        public string id { get; set; }
        /// <summary>
        /// 文章标题
        /// </summary>
        public string title { get; set; }
        /// <summary>
        /// 文章内容
        /// </summary>
        public string content { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime createTime { get; set; }
        /// <summary>
        /// 文章类型
        /// </summary>
        public int type { get; set; }
        /// <summary>
        /// 当前状态
        /// </summary>
        public int state { get; set; }
        /// <summary>
        /// 作者
        /// </summary>
        public string auther { get; set; }
    }

    
}
