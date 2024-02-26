"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      options: {
        text: "",
        // 目标对象：目标对象的称谓汉字表达，称谓间用‘的’字分隔
        // target:'',	    	// 相对对象：相对对象的称谓汉字表达，称谓间用‘的’字分隔，空表示自己
        sex: 1,
        // 本人性别：0表示女性,1表示男性
        // type: 'default',		// 转换类型：'default'计算称谓,'chain'计算关系链,'pair'计算关系合称
        reverse: false
        // 称呼方式：true对方称呼我,false我称呼对方
        // mode: 'default',		// 模式选择：使用setMode方法定制不同地区模式，在此选择自定义模式
        // optimal: false,       	// 最短关系：计算两者之间的最短关系
      },
      targetSex: 1,
      tips: "我称呼Ta",
      arr: [],
      input: "",
      output: ""
    };
  },
  onLoad() {
    common_vendor.onShareAppMessage(() => {
      return {
        title: "算算这个亲戚应该怎么称呼？",
        path: "/pages/index/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "算算这个亲戚应该怎么称呼？",
        path: "/pages/index/index"
      };
    });
  },
  methods: {
    handleSex() {
      this.options.sex = this.options.sex ? 0 : 1;
    },
    handleButton(e) {
      this.targetSex = e.target.dataset.sex ? 1 : 0;
      this.tips = "我称呼" + (this.targetSex ? "他" : "她");
      this.arr.push(e.target.dataset.value);
      this.output = this.arr.join("的");
      this.options.text = this.output;
    },
    handleBackspace() {
      this.arr.pop();
      this.output = this.arr.join("的");
      this.options.text = this.output;
    },
    handleClear() {
      this.arr = [];
      this.output = "";
      this.input = "";
      this.options.text = "";
    },
    handleEqual() {
      this.output = this.arr.join("的");
      if (!this.options.text) {
        this.output = "请输入";
        return;
      }
      this.input = this.output;
      this.options.reverse = false;
      const result = common_vendor.relationship(this.options);
      console.log(result);
      this.tips = "我称呼" + (this.targetSex ? "他" : "她");
      this.output = result.length ? result.join("、") : "出错了";
    },
    handleExchange() {
      this.output = this.arr.join("的");
      if (!this.options.text) {
        this.output = "请输入";
        return;
      }
      this.input = this.output;
      this.options.reverse = !this.options.reverse;
      const result = common_vendor.relationship(this.options);
      console.log(result);
      const tips = "我称呼" + (this.targetSex ? "他" : "她");
      this.tips = this.options.reverse ? tips.split("").reverse().join("") : tips;
      this.output = result.length ? result.join("、") : "出错了";
    },
    handleHelp() {
      this.$refs.popup.open("bottom");
    },
    handleClose() {
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.tips),
    b: common_vendor.t($data.input),
    c: common_vendor.t($data.output),
    d: common_vendor.n($data.options.sex === 1 ? "switch" : "switch female"),
    e: common_vendor.o((...args) => $options.handleSex && $options.handleSex(...args)),
    f: common_vendor.o((...args) => $options.handleButton && $options.handleButton(...args)),
    g: common_vendor.o((...args) => $options.handleButton && $options.handleButton(...args)),
    h: common_vendor.o((...args) => $options.handleButton && $options.handleButton(...args)),
    i: common_vendor.o((...args) => $options.handleButton && $options.handleButton(...args)),
    j: common_vendor.o((...args) => $options.handleButton && $options.handleButton(...args)),
    k: common_vendor.o((...args) => $options.handleButton && $options.handleButton(...args)),
    l: common_vendor.o((...args) => $options.handleButton && $options.handleButton(...args)),
    m: common_vendor.o((...args) => $options.handleButton && $options.handleButton(...args)),
    n: common_vendor.o((...args) => $options.handleBackspace && $options.handleBackspace(...args)),
    o: $data.arr.length === 0,
    p: common_vendor.n($data.arr.length === 0 ? "disable" : ""),
    q: $data.targetSex === 1,
    r: common_vendor.o((...args) => $options.handleButton && $options.handleButton(...args)),
    s: common_vendor.n($data.targetSex === 1 ? "disable" : ""),
    t: common_vendor.o((...args) => $options.handleExchange && $options.handleExchange(...args)),
    v: common_vendor.o((...args) => $options.handleHelp && $options.handleHelp(...args)),
    w: common_vendor.o((...args) => $options.handleClear && $options.handleClear(...args)),
    x: $data.arr.length === 0,
    y: common_vendor.n($data.arr.length === 0 ? "disable" : ""),
    z: $data.targetSex === 0,
    A: common_vendor.o((...args) => $options.handleButton && $options.handleButton(...args)),
    B: common_vendor.n($data.targetSex === 0 ? "disable" : ""),
    C: common_vendor.o((...args) => $options.handleEqual && $options.handleEqual(...args)),
    D: common_vendor.o((...args) => $options.handleClose && $options.handleClose(...args)),
    E: common_vendor.sr("popup", "1cf27b2a-0"),
    F: common_vendor.p({
      type: "bottom"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/Mukti/Developer/uni-relationship/乐哥亲戚计算器/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
