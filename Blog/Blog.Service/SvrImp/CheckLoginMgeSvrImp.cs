using Account.Service;
using service.core;
using sso.service;
using System;
using System.Collections.Generic;
using System.Text;

namespace Blog.Service
{
    public class CheckLoginMgeSvr:ICheckLoginMgeSvr
    {

        private ISessionMgeSvr _SessionMgeSvr = null;
        public CheckLoginMgeSvr() : base()
        {
            _SessionMgeSvr = ServiceManager.GetService<ISessionMgeSvr>("SessionMgeSvr");
        }

        public bool CheckLogin(string token)
        {
            var res = _SessionMgeSvr.Get(token);
            return !string.IsNullOrEmpty(res.Token);
        }
    }
}
