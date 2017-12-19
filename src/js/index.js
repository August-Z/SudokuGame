"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("./ui/grid");
const popupNumbers_1 = require("./ui/popupNumbers");
const grid = new grid_1.default($("#container"), $("#levelSel")); //创建实例
grid.build(); //开始构建
grid.layout(); //调整高度
const popupNumbers = new popupNumbers_1.default($("#popupNumbers"));
grid.bindPopup(popupNumbers); //绑定操作
//底部按键
$("#check").on("click", e => {
    if (grid.check()) {
        alert("ok");
    }
});
$("#clear").on("click", e => {
    grid.clear();
});
$("#reset").on("click", e => {
    grid.reset();
});
$("#rebuild").on("click", e => {
    grid.rebuild();
});
