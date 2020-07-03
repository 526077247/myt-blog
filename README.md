# myt-blog
 my blog
 
 前端 angular material bootstrap
 
 后端 .netcore3.1 ibatis castle
 
 数据库 mysql
 
 部署 nginx 

 登录服务是代理的另一个SSO项目的接口

后端文件目录结构
```
├─Blog.sln
├─sql（数据库文件）
|  └BlogInfo.sql
├─Blog.Service（核心业务）
|      ├─SvrIntf（服务接口）
|      |    ├─BlogInfoMgeSvrIntf.cs
|      |    └LoginMgeSvrIntf.cs
|      ├─SvrImp（服务接口实现类）
|      |   ├─BlogInfoMgeSvrImp.cs
|      |   └CheckLoginMgeSvrImp.cs
|      ├─Maps（数据库语句映射文件）
|      |  └BlogInfo.xml
|      ├─Domain（实体类）
|      |   ├─BlogInfo.cs
|      |   └LoginResult.cs
|      └─Dao（数据访问层）
|         └BlogInfoDao.cs
├─Blog（发布方式及配置）
|  ├─appsettings.Development.json
|  ├─appsettings.json(项目配置文件)
|  ├─Components.xml(castle配置文件)
|  ├─hosting.json(启动端口配置文件)
|  ├─Program.cs
|  ├─Startup.cs
|  ├─wwwroot
|  |    └─api（需要发布的接口）
|  |       ├─BlogInfoMgeSvr.json（调用接口方式:/api/BlogInfoMgeSvr.rsfs/方法名?方法参数）
|  |       └type.json(配置文件)
|  ├─config(ibatis配置文件)
|  |   ├─dao.config
|  |   ├─providers.config
|  |   └SqlMap.config
├─Blog.Test（单元测试）
```
