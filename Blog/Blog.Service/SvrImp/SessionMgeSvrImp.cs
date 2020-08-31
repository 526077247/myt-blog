using System;
using System.Collections.Generic;
using System.Text;
using Account.Service;
using service.core;

namespace Blog.Service
{
    public class SessionMgeSvr : ISessionMgeSvr
    {
        private readonly ICacheManager cacheManager = null;
        private readonly ICacheMgeSvr _CacheMgeSvr = null;
        public SessionMgeSvr()
        {
            cacheManager = (ICacheManager)ServiceManager.GetService(typeof(ICacheManager));
            _CacheMgeSvr = cacheManager.GetCache("LoginResult");
        }

        public void Add(LoginResult result)
        {
            if (!_CacheMgeSvr.Put(result.Token, result, 3600 * 12))
                throw new Exception("服务器繁忙请稍后再试");
        }

        public LoginResult Get(string token = "")
        {
            if (token == "")
            {
                return new LoginResult();
            }
            LoginResult obj = _CacheMgeSvr.Get<LoginResult>(token);
            if (obj != null)
            {
                return obj;
            }
            else
                return new LoginResult();
        }
    }
}
