﻿using Account.Service;
using IBatisNet.DataAccess;
using service.core;
using sso.service;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Blog.Service
{
    /// <summary>
    /// 博客文章管理服务
    /// </summary>
    public class BlogInfoMgeSvr : AppServiceBase, IBlogInfoMgeSvr
    {
        #region 服务描述：博客文章管理服务

        private readonly IDaoManager daoManager = null;
        private readonly IBlogInfoDao _BlogInfoDao = null;
        private ISessionMgeSvr _SessionMgeSvr = null;
        /// <summary>
        /// 构造函数
        /// </summary>
        public BlogInfoMgeSvr() : base()
        {
            daoManager = ServiceConfig.GetInstance().DaoManager;
            _SessionMgeSvr = ServiceManager.GetService<ISessionMgeSvr>("SessionMgeSvr");
            _BlogInfoDao = (IBlogInfoDao)daoManager.GetDao(typeof(IBlogInfoDao));
        }

        #endregion


        #region IBlogInfoMgeSvr函数

        /// <summary>
        /// 添加博客文章
        /// </summary>
        /// <param name="token">token</param>
        /// <param name="blogInfo">文章信息</param>
        /// <returns></returns>
        [PublishMethod]
        public BlogInfo Add(string token, BlogInfo blogInfo)
        {
            if(blogInfo.content.Length>50000||blogInfo.title.Length>50)
                throw new ServiceException((int)TYPE_OF_RESULT_TYPE.failure, "字数过长");
            var info = _SessionMgeSvr.Get(token);
            if (string.IsNullOrEmpty(info.Name))
                throw new ServiceException((int)TYPE_OF_RESULT_TYPE.offline, "未登录");
            blogInfo.id = Guid.NewGuid().ToString();
            blogInfo.createTime = DateTime.Now;
            blogInfo.auther = info.Name;
            _BlogInfoDao.Insert(blogInfo);
            return blogInfo;
        }

        /// <summary>
        /// 修改博客文章
        /// </summary>
        /// <param name="token">token</param>
        /// <param name="id">文章信息标识</param>
        /// <param name="blogInfo">文章信息</param>
        /// <returns></returns>
        [PublishMethod]
        public BlogInfo Update(string token, string id, BlogInfo blogInfo)
        {
            if (blogInfo.content.Length > 50000 || blogInfo.title.Length > 50)
                throw new ServiceException((int)TYPE_OF_RESULT_TYPE.failure, "字数过长");
            var info = _SessionMgeSvr.Get(token);
            if (string.IsNullOrEmpty(info.Name))
                throw new ServiceException((int)TYPE_OF_RESULT_TYPE.offline, "未登录");
            BlogInfo oldBlogInfo = Get(id);
            if(oldBlogInfo.auther != info.Name)
                throw new ServiceException((int)TYPE_OF_RESULT_TYPE.failure, "无权限");
            if (!string.IsNullOrEmpty(oldBlogInfo?.id))
            {
                blogInfo.auther = oldBlogInfo.auther;
                blogInfo.id = id;
                blogInfo.createTime = oldBlogInfo.createTime;
                _BlogInfoDao.Update(blogInfo);
                return blogInfo;
            }
            return new BlogInfo();
        }

        /// <summary>
        /// 删除博客文章
        /// </summary>
        /// <param name="token">token</param>
        /// <param name="id">文章信息标识</param>
        /// <returns></returns>
        [PublishMethod]
        public int Delete(string token, string id)
        {
            var info = _SessionMgeSvr.Get(token);
            if (string.IsNullOrEmpty(info.Name))
                throw new ServiceException((int)TYPE_OF_RESULT_TYPE.offline, "未登录");
            BlogInfo oldBlogInfo = Get(id);
            if(oldBlogInfo.auther == info.Name)
                return _BlogInfoDao.Delete(oldBlogInfo);
            throw new ServiceException((int)TYPE_OF_RESULT_TYPE.failure, "无权限");
        }

        /// <summary>
        /// 查询博客文章内容
        /// </summary>
        /// <param name="id">文章信息标识</param>
        /// <returns></returns>
        [PublishMethod]
        public BlogInfo Get(string id)
        {
            BlogInfo blogInfo = new BlogInfo { id = id };
            blogInfo = (BlogInfo)_BlogInfoDao.Get(blogInfo);
            if (blogInfo == null)
                return new BlogInfo();
            return blogInfo;
        }

        /// <summary>
        /// 查询博客文章列表
        /// </summary>
        /// <param name="start">起始位置</param>
        /// <param name="pageSize">分页大小</param>
        /// <param name="types">类型字符串','隔开</param>
        /// <param name="key">标题关键字</param>
        /// <param name="createTimeS">创建时间起</param>
        /// <param name="createTimeE">创建时间止</param>
        /// <returns></returns>
        [PublishMethod]
        public ResultList<BlogInfo> QueryList(int start, int pageSize, string types, string key = "", string createTimeS = "2000-01-01T00:00:00", string createTimeE = "2099-01-01T00:00:00")
        {
            if (pageSize > 20)
                pageSize = 20;
            else if (pageSize < 5)
                pageSize = 5;
            ResultList<BlogInfo> infos = new ResultList<BlogInfo>();
            Hashtable para = new Hashtable();
            para.Add("type_IN", types);
            para.Add("createTime_S", FormatDate(createTimeS));
            para.Add("createTime_E", FormatDate(createTimeE));
            para.Add("_OrderBy", "createTime_D");
            para.Add("title_LIKE", key);
            int total = _BlogInfoDao.QueryCount(para);
            var list = _BlogInfoDao.QueryList(para, start, pageSize);
            if (list.Count > 0)
            {
                foreach (BlogInfo blogInfo in list)
                {
                    infos.list.Add(blogInfo);
                }
            }
            infos.pageSize = pageSize;
            infos.start = start;
            infos.total = total;
            return infos;
        }

        /// <summary>
        /// 取相邻记录
        /// </summary>
        /// <param name="blogInfo"></param>
        /// <returns></returns>
        [PublishMethod]
        public ResultList<BlogInfo> GetAdjacentBlogInfo(BlogInfo blogInfo)
        {
            ResultList<BlogInfo> infos = new ResultList<BlogInfo>();
            Hashtable para = new Hashtable();
            para.Add("type", blogInfo.type);
            para.Add("createTime", blogInfo.createTime);
            para.Add("auther", blogInfo.auther);
            var list = _BlogInfoDao.GetAdjacentBlogInfo(para, 0, -1);
            if (list.Count > 0)
            {
                foreach (BlogInfo Info in list)
                {
                    infos.list.Add(Info);
                }
            }
            return infos;
        }
        #endregion

        #region 私有方法
        private string FormatDate(string date)
        {
            DateTime dateTime = DateTime.Parse(date);
            return dateTime.ToString("yyyy-MM-ddTHH:mm:ss");
        }
        #endregion

    }
}
