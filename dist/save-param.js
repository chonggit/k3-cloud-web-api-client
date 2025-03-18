"use strict";
/** Created by cihong.liu 2024-10-23 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveParam = void 0;
var save_param_base_1 = require("./save-param-base");
/** 单据保存参数 */
var SaveParam = /** @class */ (function (_super) {
    __extends(SaveParam, _super);
    function SaveParam(Model) {
        var _this = _super.call(this) || this;
        _this.Model = Model;
        return _this;
    }
    return SaveParam;
}(save_param_base_1.SaveParamBase));
exports.SaveParam = SaveParam;
