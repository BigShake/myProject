import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Promise from 'promise-polyfill';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import CustComponents from './components';
// import 'iview/dist/styles/iview.css';
import "@/styles/theme_default.less";
import "@/styles/iconfont/iconfont.css";

global.Promise = Promise;

global.UEDITOR_HOME_URL = (process.env.NODE_ENV && process.env.NODE_ENV === "production") 
    ? "/dist/assets/ueditor/" : "/src/assets/ueditor/";

Vue.use(VueRouter);
Vue.use(iView);

Vue.use(CustComponents);

// 模拟数据mock启动，在生产环境时可注释掉
require("./config/mockconf").default.start();

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
