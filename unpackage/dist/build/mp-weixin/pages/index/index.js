(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0250":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{PageCur:"home",brand:""}},onLoad:function(){var n=wx.getSystemInfoSync(),t=this;console.log(n.brand),t.brand=n.brand},methods:{NavChange:function(n){this.PageCur=n.currentTarget.dataset.cur,console.log(this.PageCur)}}};t.default=a},"0e78":function(n,t,e){"use strict";e.r(t);var a=e("0250"),r=e.n(a);for(var u in a)"default"!==u&&function(n){e.d(t,n,(function(){return a[n]}))}(u);t["default"]=r.a},"4a40":function(n,t,e){"use strict";e.r(t);var a=e("a63b"),r=e("0e78");for(var u in r)"default"!==u&&function(n){e.d(t,n,(function(){return r[n]}))}(u);var o,c=e("f0c5"),i=Object(c["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=i.exports},"5d7e":function(n,t,e){"use strict";(function(n){e("308d");a(e("66fd"));var t=a(e("4a40"));function a(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},a63b:function(n,t,e){"use strict";var a;e.d(t,"b",(function(){return r})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return a}));var r=function(){var n=this,t=n.$createElement;n._self._c},u=[]}},[["5d7e","common/runtime","common/vendor"]]]);