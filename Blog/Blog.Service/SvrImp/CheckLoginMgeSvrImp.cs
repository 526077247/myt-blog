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
            _LoginMgeSvr = DynServerFactory.CreateServer<ILoginMgeSvr>("http://127.0.0.1/Service/LoginMgeSvr.assx");
        }

        public bool CheckLogin(string token)
        {
            var res = _LoginMgeSvr.GetLoginInfo(token);
            return !string.IsNullOrEmpty(res.Token);
        }
    }
}
