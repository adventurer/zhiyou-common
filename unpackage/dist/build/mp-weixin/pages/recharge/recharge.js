(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/recharge/recharge"],{"161b":function(t,e,n){"use strict";var a,r=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))},"55d8":function(t,e,n){},7182:function(t,e,n){"use strict";var a=n("55d8"),r=n.n(a);r.a},"761e":function(t,e,n){"use strict";n.r(e);var a=n("161b"),r=n("a815");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("7182");var c,o=n("f0c5"),u=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);e["default"]=u.exports},"9dda":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("4795"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,a,r,i,c){try{var o=t[i](c),u=o.value}catch(s){return void n(s)}o.done?e(u):Promise.resolve(u).then(a,r)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var c=t.apply(e,n);function o(t){i(c,a,r,o,u,"next",t)}function u(t){i(c,a,r,o,u,"throw",t)}o(void 0)}))}}var o={data:function(){return{elements:[],timeStamp:"",nonceStr:"",package:"",signType:"MD5",paySign:"",text:"由于相关规范,ios功能暂不可用"}},mounted:function(){var t=this;wx.request({url:"https://admin.jiasu.zhifool.com/api/v1/weixin/microrechargesetting",data:{},header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){var n=wx.getSystemInfoSync();"iPhone"!=n.brand&&(t.elements=e.data.Data,t.text="请点选卡片进行充值")}})},methods:{recharge:function(t){this.commitTicket(t)},commitTicket:function(t){var e=this;return c(a.default.mark((function n(){var r;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=e,wx.request({url:"https://admin.jiasu.zhifool.com/api/v1/weixin/microrecharge",data:{openid:r.$store.state.openid,fee:t},header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){return console.log(t.data.Sta),0!=t.data.Sta&&(r.timeStamp=t.data.Data.timestamp,r.nonceStr=t.data.Data.nonceStr,r.package=t.data.Data.package,r.paySign=t.data.Data.paySign,r.signType=t.data.Data.signType,r.commitPay(),!0)}});case 2:case"end":return n.stop()}}),n)})))()},commitPay:function(){var t=this;return c(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=t,wx.requestPayment({timeStamp:n.timeStamp,nonceStr:n.nonceStr,package:n.package,signType:n.signType,paySign:n.paySign,success:function(t){},fail:function(t){}});case 2:case"end":return e.stop()}}),e)})))()}}};e.default=o},a815:function(t,e,n){"use strict";n.r(e);var a=n("9dda"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=r.a},b876:function(t,e,n){"use strict";(function(t){n("308d");a(n("66fd"));var e=a(n("761e"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["b876","common/runtime","common/vendor"]]]);