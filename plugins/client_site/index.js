import Vue from "vue";
import hljs from "highlight.js";
import "./baidu_tongji.js";
// import "./clientInit.js";
// import "./valine.js";

const install = function (VueClass, opts = {}) {};
Vue.use(install);

//自定义全局指令
Vue.directive("highlight", (el) => {
    const blocks = el.querySelectorAll("pre code");
    blocks.forEach((block) => {
        hljs.highlightBlock(block);
    });
});

import fastclick from "fastclick";
fastclick.attach(document.body);
