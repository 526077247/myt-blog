using service.core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Blog.Service
{
    public interface IBlogInfoMgeSvr: IAppServiceBase
    {
        /// <summary>
        /// 添加博客文章
        /// </summary>
        /// <param name="token">token</param>
        /// <param name="blogInfo">文章信息</param>
        /// <returns></returns>
        [PublishMethod]
        [CheckLogin]
        BlogInfo Add(string token, BlogInfo blogInfo);

        /// <summary>
        /// 修改博客文章
        /// </summary>
        /// <param name="token">token</param>
        /// <param name="id">文章信息标识</param>
        /// <param name="blogInfo">文章信息</param>
        /// <returns></returns>
        [PublishMethod]
        [CheckLogin]
        BlogInfo Update(string token, string id, BlogInfo blogInfo);

        /// <summary>
        /// 删除博客文章
        /// </summary>
        /// <param name="token">token</param>
        /// <param name="id">文章信息标识</param>
        /// <returns></returns>
        [PublishMethod]
        [CheckLogin]
        int Delete(string token, string id);

        /// <summary>
        /// 查询博客文章内容
        /// </summary>
        /// <param name="id">文章信息标识</param>
        /// <returns></returns>
        [PublishMethod]
        BlogInfo Get(string id);

        /// <summary>
        /// 查询博客文章列表
        /// </summary>
        /// <param name="start">起始位置</param>
        /// <param name="pageSize">分页大小</param>
        /// <param name="types">类型字符串','隔开</param>
        /// <param name="createTimeS">创建时间起</param>
        /// <param name="createTimeE">创建时间止</param>
        /// <returns></returns>
        [PublishMethod]
        DataList<BlogInfo> QueryList(int start, int pageSize, string types, string createTimeS = "2000-01-01T00:00:00", string createTimeE = "2099-01-01T00:00:00");

        /// <summary>
        /// 取相邻记录
        /// </summary>
        /// <param name="blogInfo"></param>
        /// <returns></returns>
        [PublishMethod]
        DataList<BlogInfo> GetAdjacentBlogInfo(BlogInfo blogInfo);
    }
}
