```bash
# 克隆项目
git clone https://github.com/Streafd/-.git

# 安装依赖
npm install

# 启动服务
npm run dev
```
基于vue2的管理模板进行搭建->https://github.com/PanJiaChen/vue-admin-template.git

# 文件介绍
```bash
build
     ----index.js webpack配置文件【很少修改这个文件】
mock
    ----mock数据的文件夹【模拟一些假的数据mockjs实现的】，因为咱们实际开发的时候，利用的是真是接口

node_modules
     ------项目依赖的模块

public
     ------ico图标,静态页面，publick文件夹里面经常放置一些静态资源，而且在项目打包的时候webpack不会编译这个文件夹，原封不动的打包到dist文件夹里面

src
    -----程序员源代码的地方
    ------api文件夹:涉及请求相关的
    ------assets文件夹：里面放置一些静态资源（一般共享的），放在aseets文件夹里面静态资源，在webpack打包的时候，会进行编译
    ------components文件夹：一般放置非路由组件获取全局组件
    ------icons这个文件夹的里面放置了一些svg矢量图
    ------layout文件夹：他里面放置一些组件与混入
    ------router文件夹：与路由相关的
    -----store文件夹：一定是与vuex先关的
    -----style文件夹：与样式先关的
    ------utils文件夹：request.js是axios二次封装文件****
    ------views文件夹：里面放置的是路由组件

App.vue:根组件
main.js：入口文件
permission.js:与导航守卫先关、
settings：项目配置项文件
.env.development
.env.producation
```

# 后台路由
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623151630.png)
# 技术
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152838.png)
# 登录业务
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152841.png)
# 首页展示
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152844.png)
# 品牌管理组件
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152847.png)
# 添加品牌与修改品牌
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152841.png)
# 删除品牌操作
删除操作

# 平台属性管理
例如电池具有的容量，手机系统等属性
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152850.png)

# 添加属性与修改属性
添加操作
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152853.png)
修改操作
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152856.png)
# 删除属性操作
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152856.png)
# 获取数据动态的三级联动

# SPU管理
SPU的列表结构，添加SPU/修改SPU/查看详情/删除
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152858.png)
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152901.png)
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152903.png)

# SKU管理
SKU的列表结构，上架|下架/修改/查看详情/删除
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152906.png)
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152910.png)

# 用户管理
具有查询，添加以及删除等操作
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152910.png)
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152923.png)
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152927.png)
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152918.png)

# 角色授权
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152920.png)
# 菜单管理
![image](https://github.com/Streafd/DeomImg/blob/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230623152929.png)
