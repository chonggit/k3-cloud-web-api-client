"use strict";
/** Created by cihong.liu 2024-10-22 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.K3CloudWebAPIClient = void 0;
var create_axios_instance_1 = require("./create-axios-instance");
var send_request_1 = require("./send-request");
var k3_cloud_services_1 = require("./k3-cloud-services");
var login_by_sign_1 = require("./login-by-sign");
var K3CloudWebAPIClient = /** @class */ (function () {
    function K3CloudWebAPIClient(_config) {
        this._config = _config;
    }
    // 获取 Axios 实例
    K3CloudWebAPIClient.prototype.getAxiosInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._axios) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, (0, create_axios_instance_1.createAxiosInstance)(this._config)];
                    case 1:
                        _a._axios = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this._axios];
                }
            });
        });
    };
    /** 根据金蝶返回的响应结果，判断用户是否已登录或登录信息是否过期 */
    K3CloudWebAPIClient.prototype.isLoginExpired = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // 返回的数据为数组
                if (Array.isArray(response)) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, response.Result.ResponseStatus.MsgCode === 1];
            });
        });
    };
    K3CloudWebAPIClient.prototype.loginBySign = function (config) {
        return (0, login_by_sign_1.loginBySign)(Object.assign({}, this._config, config));
    };
    /** 发送 http 请求 */
    K3CloudWebAPIClient.prototype.send = function (serviceName, param) {
        return __awaiter(this, void 0, void 0, function () {
            var axiosInstance, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getAxiosInstance()];
                    case 1:
                        axiosInstance = _b.sent();
                        return [4 /*yield*/, (0, send_request_1.sendRequest)(axiosInstance, serviceName, param)];
                    case 2:
                        result = _b.sent();
                        return [4 /*yield*/, this.isLoginExpired(result)];
                    case 3:
                        if (!_b.sent()) return [3 /*break*/, 6];
                        this._axios = undefined;
                        _a = send_request_1.sendRequest;
                        return [4 /*yield*/, this.getAxiosInstance()];
                    case 4: return [4 /*yield*/, _a.apply(void 0, [_b.sent(), serviceName, param])];
                    case 5: return [2 /*return*/, (_b.sent()).Result];
                    case 6: return [2 /*return*/, result.Result];
                }
            });
        });
    };
    /** 执行查询 */
    K3CloudWebAPIClient.prototype.executeBillQuery = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var response, results, keys_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.send(k3_cloud_services_1.EXECUTE_BILL_QUERY_SERVICE_NAME, {
                            data: param,
                        })];
                    case 1:
                        response = _a.sent();
                        // 执行成功，转换查询结果
                        if (response.ResponseStatus.IsSuccess) {
                            results = response.Result;
                            keys_1 = param.FieldKeys.split(',');
                            response.Result = results.map(function (result) {
                                var newResult = {};
                                result.forEach(function (value, index) {
                                    newResult[keys_1[index]] = value;
                                });
                                return newResult;
                            });
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /** 审核单据 */
    K3CloudWebAPIClient.prototype.aduit = function (formId, param) {
        return this.send(k3_cloud_services_1.AUDIT_SERVICE_NAME, { formid: formId, data: param });
    };
    /** 单据保存为草稿 */
    K3CloudWebAPIClient.prototype.draft = function (formId, param) {
        return this.send(k3_cloud_services_1.DRAFT_SERVICE_NAME, { formid: formId, data: param });
    };
    /** 下推单据 */
    K3CloudWebAPIClient.prototype.push = function (formId, param) {
        return this.send(k3_cloud_services_1.PUSH_SERVICE_NAME, { formid: formId, data: param });
    };
    /** 删除单据 */
    K3CloudWebAPIClient.prototype.remove = function (formId, param) {
        return this.send(k3_cloud_services_1.DELETE_SERVICE_NAME, { formid: formId, data: param });
    };
    /** 保存单据 */
    K3CloudWebAPIClient.prototype.save = function (formId, param) {
        return this.send(k3_cloud_services_1.SAVE_SERVICE_NAME, { formid: formId, data: param });
    };
    /** 提交单据 */
    K3CloudWebAPIClient.prototype.submit = function (formId, param) {
        return this.send(k3_cloud_services_1.SUBMIT_SERVICE_NAME, { formid: formId, data: param });
    };
    /** 驳回已审单据 */
    K3CloudWebAPIClient.prototype.unAduit = function (formId, param) {
        return this.send(k3_cloud_services_1.UN_AUDIT_SERVICE_NAME, { formid: formId, data: param });
    };
    return K3CloudWebAPIClient;
}());
exports.K3CloudWebAPIClient = K3CloudWebAPIClient;
