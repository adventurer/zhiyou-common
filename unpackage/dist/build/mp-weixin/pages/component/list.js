(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/component/list"],{1837:function(e,t,n){},"3e80":function(e,t,n){"use strict";(function(e){n("55f2");o(n("66fd"));var t=o(n("f5b9"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"7a72":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var c=function(){var e=this,t=e.$createElement;e._self._c},a=[]},c6cb:function(e,t,n){"use strict";var o=n("1837"),c=n.n(o);c.a},cae9:function(e,t,n){"use strict";n.r(t);var o=n("d58f"),c=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=c.a},d58f:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{cuIconList:[{cuIcon:"cardboardfill",color:"red",badge:120,name:"VR"},{cuIcon:"recordfill",color:"orange",badge:1,name:"录像"},{cuIcon:"picfill",color:"yellow",badge:0,name:"图像"},{cuIcon:"noticefill",color:"olive",badge:22,name:"通知"},{cuIcon:"upstagefill",color:"cyan",badge:0,name:"排行榜"},{cuIcon:"clothesfill",color:"blue",badge:0,name:"皮肤"},{cuIcon:"discoverfill",color:"purple",badge:0,name:"发现"},{cuIcon:"questionfill",color:"mauve",badge:0,name:"帮助"},{cuIcon:"commandfill",color:"purple",badge:0,name:"问答"},{cuIcon:"brandfill",color:"mauve",badge:0,name:"版权"}],modalName:null,gridCol:3,gridBorder:!1,menuBorder:!1,menuArrow:!1,menuCard:!1,skin:!1,listTouchStart:0,listTouchDirection:null}},methods:{showModal:function(e){this.modalName=e.currentTarget.dataset.target},hideModal:function(e){this.modalName=null},Gridchange:function(e){this.gridCol=e.detail.value},Gridswitch:function(e){this.gridBorder=e.detail.value},MenuBorder:function(e){this.menuBorder=e.detail.value},MenuArrow:function(e){this.menuArrow=e.detail.value},MenuCard:function(e){this.menuCard=e.detail.value},SwitchSex:function(e){this.skin=e.detail.value},ListTouchStart:function(e){this.listTouchStart=e.touches[0].pageX},ListTouchMove:function(e){this.listTouchDirection=e.touches[0].pageX-this.listTouchStart>0?"right":"left"},ListTouchEnd:function(e){"left"==this.listTouchDirection?this.modalName=e.currentTarget.dataset.target:this.modalName=null,this.listTouchDirection=null}}};t.default=o},f5b9:function(e,t,n){"use strict";n.r(t);var o=n("7a72"),c=n("cae9");for(var a in c)"default"!==a&&function(e){n.d(t,e,(function(){return c[e]}))}(a);n("c6cb");var u,i=n("f0c5"),l=Object(i["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);t["default"]=l.exports}},[["3e80","common/runtime","common/vendor"]]]);