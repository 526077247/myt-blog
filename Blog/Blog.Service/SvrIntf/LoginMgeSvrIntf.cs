using System;
using System.Collections.Generic;
using System.Text;
using service.core;
namespace sso.service
{
    public interface ILoginMgeSvr:IAppServiceBase
    {

        /// <summary>
        /// 获取登录信息
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        [PublishMethod]
        LoginResult GetLoginInfo(string token);
    }
}
