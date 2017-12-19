"use strict";
//处理弹出的操作面板
var PopupNumbers = /** @class */ (function () {
    function PopupNumbers($panel) {
        var _this = this;
        this._$panel = $panel.hide().removeClass("hidden");
        this._$panel.on("click", "span", function (e) {
            var $cell = _this._$targetCell;
            var $span = $(e.target);
            if ($span.hasClass("mark1")) {
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                }
                else {
                    $cell.removeClass("mark2")
                        .addClass("mark1");
                }
            }
            else if ($span.hasClass("mark2")) {
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                }
                else {
                    $cell.removeClass("mark1")
                        .addClass("mark2");
                }
            }
            else if ($span.hasClass("empty")) {
                //取消数字和mark
                $cell.text(0)
                    .addClass("empty");
            }
            else {
                //回填数字
                $cell.removeClass("empty")
                    .text($span.text());
            }
            _this.hide();
        });
    }
    PopupNumbers.prototype.popup = function ($cell) {
        this._$targetCell = $cell;
        var _a = $cell.position(), left = _a.left, top = _a.top;
        this._$panel.css({
            left: left + "px",
            top: top + "px"
        }).show();
    };
    PopupNumbers.prototype.hide = function () {
        this._$panel.hide();
    };
    return PopupNumbers;
}());
module.exports = PopupNumbers;
