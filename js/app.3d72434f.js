(function(e){function t(t){for(var s,n,a=t[0],l=t[1],o=t[2],u=0,p=[];u<a.length;u++)n=a[u],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&p.push(i[n][0]),i[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);_&&_(t);while(p.length)p.shift()();return c.push.apply(c,o||[]),r()}function r(){for(var e,t=0;t<c.length;t++){for(var r=c[t],s=!0,a=1;a<r.length;a++){var l=r[a];0!==i[l]&&(s=!1)}s&&(c.splice(t--,1),e=n(n.s=r[0]))}return e}var s={},i={app:0},c=[];function n(t){if(s[t])return s[t].exports;var r=s[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=s,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/rusbitech/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var o=0;o<a.length;o++)t(a[o]);var _=l;c.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"199c":function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("ac1f"),core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("5319"),core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("99af"),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__);__webpack_exports__["a"]={name:"App",data:function(){return{numbers:[{value:0,class:"zero"},{value:1,class:"one"},{value:2,class:"two"},{value:3,class:"three"},{value:4,class:"four"},{value:5,class:"five"},{value:6,class:"six"},{value:7,class:"seven"},{value:8,class:"eight"},{value:9,class:"nine"}],operations:[{value:"+",class:"plus"},{value:"-",class:"minus"},{value:"×",class:"multiply"},{value:"÷",class:"divide"}],various:[{value:"%",class:"percent"},{value:",",class:"comma"}],historyArr:[],expr:"",result:"",restart:!1,xScroll:!1,yScroll:!1}},methods:{typeExpr:function(e){this.restart&&(this.expr=""),this.restart=!1,this.expr+=e,this.xScroll=this.addScroll(this.$refs.span,"x",this.$refs.calc.clientWidth-.1*this.$refs.calc.clientWidth)},countPercent:function(e,t,r,s){switch(s=t*s/100,r){case"÷":return t/s;case"×":return t*s;case"+":return parseFloat(t)+parseFloat(s);case"-":return parseFloat(t)-parseFloat(s)}},toggleSign:function(){var e=this;this.expr=this.expr.replace(/-?([0-9]+)$/,(function(t){var r=/(-?[0-9]+)(-[0-9]+)$/,s=r.test(e.expr);return parseFloat(t)>0?"-".concat(t):parseFloat(t)<0?s?"+".concat(-1*t):-1*t:void 0}))},cleanHistory:function(){this.historyArr=[],this.expr="",this.removeSavedHistory()},prepareHistoryInfo:function(){var e=new Date,t=e.toISOString().substring(0,10),r=e.toLocaleTimeString();return"".concat(t," ").concat(r," ").concat(this.expr," = ").concat(this.result)},saveHistory:function(){localStorage.setItem("historyList",JSON.stringify(this.historyArr))},removeSavedHistory:function(){localStorage.removeItem("historyList")},getSavedHistory:function(e,t){return e&&e.length>t.length?e:[]},replaceSpecialSigns:function(){this.expr=this.expr.replace(/,/g,"."),this.expr=this.expr.replace(/([0-9]+)([÷×+-])([0-9]+)%/g,this.countPercent),this.expr=this.expr.replace(/÷/g,"/"),this.expr=this.expr.replace(/×/g,"*")},check:function(e){var t=/[-+](?![0-9]+)/,r=/÷0/,s=/([0-9]+%)[÷×]([0-9]+%)/,i=/^([0-9]+%)/,c=/^([0-9]+%)[-+]([0-9]+%)$/;return r.test(e)?(this.expr="не число",!1):!(0===e.length||"%"===e[0]||"÷"===e[0]||"×"===e[0]||","===e[0]||t.test(e)||s.test(e)||i.test(e)||c.test(e))||(this.expr="Ошибка",!1)},count:function count(){if(this.check(this.expr)){this.restart=!1,this.replaceSpecialSigns(),this.result=eval(this.expr),this.result=String(this.result).replace(/\./g,",");var historyLine=this.prepareHistoryInfo(this.result);this.historyArr.push(historyLine),this.saveHistory(),this.yScroll=this.addScroll(this.$refs.historyList,"y",this.$refs.calc.clientHeight),this.expr=this.result}else this.restart=!0},addScroll:function(e,t,r){var s;return s="x"===t?e.clientWidth>=r:e.clientHeight>=r,!!s}},computed:{},created:function(){this.historyArr=this.getSavedHistory(JSON.parse(localStorage.getItem("historyList")),this.historyArr)},mounted:function(){this.yScroll=this.addScroll(this.$refs.historyList,"y",this.$refs.calc.clientHeight)}}},4369:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var s=r("2b0e"),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("div",{staticClass:"calc-wrapper"},[r("div",{ref:"calc",staticClass:"calc"},[r("div",{staticClass:"output"},[r("span",{ref:"span"},[e._v(e._s(e.expr))]),e._m(0),r("div",{class:["outputText-wrapper",{"x-scroll":e.xScroll}]},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.expr,expression:"expr"}],ref:"outputInput",class:["output-text",{startWidth:!e.xScroll,autoWidth:e.xScroll}],attrs:{type:"text",placeholder:"0"},domProps:{value:e.expr},on:{input:function(t){t.target.composing||(e.expr=t.target.value)}}})])]),e._l(e.numbers,(function(t){return r("div",{key:t.value,class:[t.class,"btn","number","centered"],on:{click:function(r){return e.typeExpr(t.value)}}},[e._v(" "+e._s(t.value)+" ")])})),e._l(e.operations,(function(t){return r("div",{key:t.class,class:[t.class,"btn","highlighted","centered"],on:{click:function(r){return e.typeExpr(t.value)}}},[e._v(" "+e._s(t.value)+" ")])})),e._l(e.various,(function(t){return r("div",{key:t.class,class:[t.class,"btn","centered"],on:{click:function(r){return e.typeExpr(t.value)}}},[e._v(" "+e._s(t.value)+" ")])})),r("div",{staticClass:"ac btn centered",on:{click:e.cleanHistory}},[e._v("AC")]),r("div",{staticClass:"plus-minus btn centered",on:{click:e.toggleSign}},[e._v("+/-")]),r("div",{staticClass:"equals btn highlighted  centered",on:{click:e.count}},[e._v("=")])],2),r("div",{ref:"historyList",class:["history",{"y-scroll":e.yScroll}]},[r("h3",[e._v("История операций")]),r("ul",{staticClass:"history-list"},e._l(e.historyArr,(function(t,s){return r("li",{key:s},[e._v(e._s(t))])})),0)])])])},c=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"circles"},[r("div",{staticClass:"dot red"}),r("div",{staticClass:"dot yellow"}),r("div",{staticClass:"dot green"})])}],n=r("199c"),a=n["a"],l=(r("f22e"),r("2877")),o=Object(l["a"])(a,i,c,!1,null,null,null),_=o.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(e){return e(_)}}).$mount("#app")},f22e:function(e,t,r){"use strict";r("4369")}});
//# sourceMappingURL=app.3d72434f.js.map