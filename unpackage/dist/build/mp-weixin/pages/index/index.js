"use strict";const t=require("../../common/vendor.js"),e={data:()=>({options:{text:"",sex:1,reverse:!1},targetSex:1,tips:"我称呼Ta",arr:[],input:"",output:""}),onLoad(){t.onShareAppMessage((()=>({title:"算算这个亲戚应该怎么称呼？",path:"/pages/index/index"}))),t.onShareTimeline((()=>({title:"算算这个亲戚应该怎么称呼？",path:"/pages/index/index"})))},methods:{handleSex(){this.options.sex=this.options.sex?0:1,0===this.arr.length&&(this.targetSex=this.options.sex)},handleButton(t){this.targetSex=t.target.dataset.sex?1:0,this.tips="我称呼"+(this.targetSex?"他":"她"),this.arr.push(t.target.dataset.value),this.output=this.arr.join("的"),this.options.text=this.output},handleBackspace(){this.arr.pop(),this.output=this.arr.join("的"),this.options.text=this.output},handleClear(){this.arr=[],this.output="",this.input="",this.options.text=""},handleEqual(){if(this.output=this.arr.join("的"),!this.options.text)return void(this.output="请输入");this.input=this.output,this.options.reverse=!1;const e=t.relationship(this.options);console.log(e),this.tips="我称呼"+(this.targetSex?"他":"她"),this.output=e.length?e.join("、"):"出错了"},handleExchange(){if(this.output=this.arr.join("的"),!this.options.text)return void(this.output="请输入");this.input=this.output,this.options.reverse=!this.options.reverse;const e=t.relationship(this.options);console.log(e);const o="我称呼"+(this.targetSex?"他":"她");this.tips=this.options.reverse?o.split("").reverse().join(""):o,this.output=e.length?e.join("、"):"出错了"},handleHelp(){this.$refs.popup.open("bottom")},handleClose(){this.$refs.popup.close()}}};if(!Array){t.resolveComponent("uni-popup")()}Math;const o=t._export_sfc(e,[["render",function(e,o,n,s,a,h){return{a:t.t(a.tips),b:t.t(a.input),c:t.t(a.output),d:t.n(1===a.options.sex?"switch":"switch female"),e:t.o(((...t)=>h.handleSex&&h.handleSex(...t))),f:t.o(((...t)=>h.handleButton&&h.handleButton(...t))),g:t.o(((...t)=>h.handleButton&&h.handleButton(...t))),h:t.o(((...t)=>h.handleButton&&h.handleButton(...t))),i:t.o(((...t)=>h.handleButton&&h.handleButton(...t))),j:t.o(((...t)=>h.handleButton&&h.handleButton(...t))),k:t.o(((...t)=>h.handleButton&&h.handleButton(...t))),l:t.o(((...t)=>h.handleButton&&h.handleButton(...t))),m:t.o(((...t)=>h.handleButton&&h.handleButton(...t))),n:t.o(((...t)=>h.handleBackspace&&h.handleBackspace(...t))),o:0===a.arr.length,p:t.n(0===a.arr.length?"disable":""),q:1===a.targetSex,r:t.o(((...t)=>h.handleButton&&h.handleButton(...t))),s:t.n(1===a.targetSex?"disable":""),t:t.o(((...t)=>h.handleExchange&&h.handleExchange(...t))),v:t.o(((...t)=>h.handleHelp&&h.handleHelp(...t))),w:t.o(((...t)=>h.handleClear&&h.handleClear(...t))),x:0===a.arr.length,y:t.n(0===a.arr.length?"disable":""),z:0===a.targetSex,A:t.o(((...t)=>h.handleButton&&h.handleButton(...t))),B:t.n(0===a.targetSex?"disable":""),C:t.o(((...t)=>h.handleEqual&&h.handleEqual(...t))),D:t.o(((...t)=>h.handleClose&&h.handleClose(...t))),E:t.sr("popup","1de88dc5-0"),F:t.p({type:"bottom"})}}],["__scopeId","data-v-1de88dc5"]]);e.__runtimeHooks=6,wx.createPage(o);