// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import GMap from './components/GMap'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import iView from 'iview'
import 'iView/dist/styles/iView.css'
import login from '@/components/login'
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.config.productionTip = false
Vue.use(iView);
Vue.use(ElementUI);
/* eslint-disable no-new */

//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + value + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie =(name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }

new Vue({
  el: '#app',			//el:设定Vue应用的DOM挂载点
  router,
   template: '<App/>',	//template:包含HTML代码的模板
  components: { App },	//components:用于模板中的Vue.js组件
  render: h => h(App)
})



