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
            _LoginMgeSvr = DynServerFactory.CreateServer<ILoginMgeSvr>("http://47.98.50.215/Service/LoginMgeSvr.assx");
        }

        public bool CheckLogin(string token)
        {
            var res = _LoginMgeSvr.GetLoginInfo(token);
            return res.Name == "526077247";
        }
    }
}
