# 药品知识库前端

医生端后台使用前后端分离的开发模式，前端由vue+iview实现。

其中涉及到的技术有：
- webpack
- node
- es6
- vue
- less (用来定义ui风格变量)
- mockjs

开发工具统一使用 vscode

## 安装

下载完代码后在命令窗口中运行

```bush
npm install
```

运行前需要检查本地是否有npm命令

```bash
npm --version
```

如果提示没有此命令，下载nodejs并安装

## 运行
### 开发模式
开发时运行以下命令

```bush
npm run dev
```
运行后项目支持热重启，即修改完代码后只需要刷新浏览器即可，插件会自动编译，不用重新运行

### 生产模式
```bush
npm run build
```

## 开发

### 工程目录说明

```
|-dist (在运行npm run build后会出现，为编译后的压缩代码，不加入版本控制)
|-node_modules (在运行npm install后会出现，为依赖模块，不加入版本控制)
|-src (工程源码，源码编译后将放到dist目录中)
|  |-assets
|  |-components (自定义组件，添加vue文件后需要在index.js内注册)
|  |-config
|  |  |-mockconf (接口模拟数据拦截配置文件夹)
|  |  config.js
|  |  env.js (自动生成，标记当前环境是否为开发环境，不加入版本控制)
|  |  mockconf.js (在mockconf目录中新加一接口归类文件后需要在此注册)
|  |
|  |-data (模拟数据存放文件夹，可定义mock数据模板)
|  |-images (图片路径)
|  |-libs (自定义函数工具)
|  |-styles (外部定义的样式文件)
|  |-template (编译生成主页面的模板文件)
|  |-views (编写的页面都放在这里，根据路由来绑定页面)
|  app.vue
|  main.js
|  router.js (路由文件，将路由和views目录下问页面文件绑定)
|  vendors.js
|   
.babelrc
index.html
index_prod.html
LICENSE
package.json
README.md
webpack.base.conf.js
webpack.dev.conf.js
webpack.prod.conf.js
```

### UI规范定义

- 根据UI规范，本项目将UI规范参数定义于difinitions.less文件中

- 组件的样式建议使用less书写

- 当样式中需要用到difinitions.less中定义的变量和mixin，需要引入定义文件，如下

```less
@import "../../styles/difinitions.less";
```

- UI规范按钮类型对应

|type   |对应UI规范|
|-------|----|
|default|按钮一规范|
|dashed |按钮二规范(灰)|
|ghost  |按钮二规范(彩)|
|info   |按钮三规范|
|primary|按钮四规范|

项目中使用方法
```html
<!-- 按钮一规范 -->
<Button>按钮一</Button>
<!-- 按钮二规范(彩) -->
<Button type="ghost">按钮二(彩)</Button>
<!-- 按钮二规范(灰) -->
<Button type="dashed">按钮二(灰)</Button>
```
- 设计图中的图标可暂时用 https://www.iviewui.com/components/icon ivew中的图标代替，后续统一改

### 编码规范说明

#### Javascript

- 自定义函数需要有文档注释，包含：函数说明，参数类型，参数名，参数说明，返回值类型，返回说明，格式示例如下：

``` javascript
/**
* 给菜单列表添加对应等级的子菜单
* @param {map<string,object>} parentMenuMap 父菜单的键值对
* @param {object} childMenuItem 子菜单项
* @param {integer} level 子菜单级别
* @returns {list<object>} 返回添加子菜单后的结果列表
*/
```

- 二元运算符与操作变量间需要有空格，一元运算符与操作变量间不能有空格

- 点运算符前后不能有空格

- 对象键值对中的冒号后需要有空格

- 函数参数列表括号和参数列表间不能有空格

- 逗号操作符后需要加空格，逗号前不加空格

- 缩进为4个空格，代码块需要有正确缩进

- this的别名只能定义为_this

- 本项目中使用es6规范，需要严格使用let和const定义变量或常量，避免使用var定义

### 接口定义

- 参照原先医生端后台管理页面，截取对应请求url及返回的请求体，放置在/src/config/mockconf文件夹的对应模块文件中，相应接口需要添加备注，如下

```javascript
/**
* 参数： 
* huCode：医生的唯一标示码
* type：操作类型 “4”：治疗状态；“5”：授权状态；“6”：数据状态
* operations：记录勾选的值 例如：“[1,2,3]”
* 4:1:正常显示,2：已转血透,3已转移植,4已放弃治疗,5其他 ; 
* 5:0 待申请,1 申请中,3 已拒绝 ; 
* 6:0 隐藏,1 显示
* {
* "huCode": "111000111",
* "type": "6",
* "operations": "[0,1]"
* }
*/
Mock.mock(
    global.API_PREFIX + "/Thingworx/Things/RecordDoctorSelection_DataBase/Services/UpdateCheckStatus",
    "post",
    require("../data/patient_list/select_stat.json")
);
```

- 不同接口归类以二级菜单为主，如“患者数据”为二级菜单，所以该菜单的页面及子页面内相应接口需要归类到patient_data.js中

- 如负责的相应模块未有接口归类文件存在，如“健康教育”，则需要新建健康教育接口归类文件（如：health_edu.js）在/src/config/mockconf目录下，并添加
``` javascript
require("./mockconf/health_edu.js");
```
到/src/config/mockconf.js的startMock函数中

- 要确保接口url与后端提供的接口路径一致，不可自己捏造接口

- 要确保mock生成的报文请求到的报文格式一致

- 确保以上两点需要与后端沟通（当接口不能满足当前开发需求），或参考医生端演示环境，也可参考附录

## 附录

### 接口列表参考


## 组件调用参考

### 分页组件 Pager

``` html

<Pager :extend-param="params" @on-request-data="getDataList" ref="patientDetailPager">
    <!-- 需要显示分页的组件，如Table -->
</Pager>

```

``` javascript
export default {
    methods: {
        getDataList(reqParam, callback) {
            //callback函数为分页插件请求成功后回调，需要传入
            //util.httpRequest函数根据自己的数据请求函数更改
            //请求数据时只需要传入reqParam即可
            let _this = this;
            util.httpRequest(url
                , reqParam
            ).then(function(res) {
                //这里可以给表格绑定的数据赋值
                callback(res.data);
            });
        },
    },
    created() {
        this.$refs.patientDetailPager.requestData();
    },
    computed: {
        params() {
            return {
                searchContent: ""
            }
        }
    }
}

//如果想手动触发数据请求，调用组件内函数
this.$refs.patientDetailPager.requestData();
```
