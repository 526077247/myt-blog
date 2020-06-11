using service.core;
using sso.service;
using System;
using System.Collections.Generic;
using System.Text;

namespace Blog.Service
{
    public class CheckLoginMgeSvr:ICheckLoginMgeSvr
    {
        private ILoginMgeSvr _LoginMgeSvr = null;
        public CheckLoginMgeSvr() : base()
        {
            _LoginMgeSvr = ServiceManager.GetService<ILoginMgeSvr>("LoginMgeSvr");
        }

        public bool CheckLogin(string token)
        {
            var res = _LoginMgeSvr.GetLoginInfo(token);
            return !string.IsNullOrEmpty(res.Token);
        }
    }
}
