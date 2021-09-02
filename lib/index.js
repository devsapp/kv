"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var os_1 = __importDefault(require("os"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var core_1 = require("@serverless-devs/core");
var base_1 = __importDefault(require("./common/base"));
var lodash_get_1 = __importDefault(require("lodash.get"));
var request_1 = require("./common/request");
// const CONTENT_TYPE_MAP = {
//   'html': 'text/html; charset=UTF-8',
//   'text': 'text/plain; charset=UTF-8',
//   'xml': 'text/xml; charset=UTF-8',
//   'gif': 'image/gif; charset=UTF-8',
//   'jpg': 'image/jpeg; charset=UTF-8',
//   'jpeg': 'image/jpeg; charset=UTF-8',
//   'png': 'image/png; charset=UTF-8',
//   'svg': 'image/svg+xml; charset=UTF-8',
//   'xhtml': 'application/xhtml+xml; charset=UTF-8',
//   'json': 'application/json; charset=UTF-8',
//   'pdf': 'application/pdf; charset=UTF-8',
//   'js': 'application/javascript; charset=UTF-8',
//   'css': 'text/css; charset=UTF-8'
// }
var ComponentDemo = /** @class */ (function (_super) {
    __extends(ComponentDemo, _super);
    function ComponentDemo(props) {
        return _super.call(this, props) || this;
    }
    ComponentDemo.prototype.setEnv = function (credentials, aliasName) {
        if (aliasName === void 0) { aliasName = 'default'; }
        return __awaiter(this, void 0, void 0, function () {
            var accessFile, accessFileInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!credentials.AccessKeyID) return [3 /*break*/, 2];
                        accessFile = path_1.default.join(os_1.default.homedir(), '.s', 'access.yaml');
                        accessFileInfo = js_yaml_1.default.load(fs_extra_1.default.readFileSync(accessFile, 'utf8') || "{}");
                        if (!accessFileInfo[aliasName]) return [3 /*break*/, 2];
                        return [4 /*yield*/, core_1.getCredential(aliasName)];
                    case 1:
                        credentials = _a.sent();
                        _a.label = 2;
                    case 2:
                        process.env.accessKey = credentials.AccessKeyID;
                        process.env.accessSecret = credentials.AccessKeySecret;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 上传kv
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.put = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, argsObj, credentials, project, othersParams, _b, key, _c, value, domain, type, domainTagIndex, sPath, yamlObj;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = inputs.argsObj, argsObj = _a === void 0 ? [] : _a, credentials = inputs.credentials, project = inputs.project;
                        return [4 /*yield*/, this.setEnv(credentials, project.access)];
                    case 1:
                        _d.sent();
                        othersParams = argsObj.slice(2);
                        _b = argsObj.slice(0, 2), key = _b[0], _c = _b[1], value = _c === void 0 ? '' : _c;
                        domain = '';
                        if (!key) {
                            throw new Error('请输入 key');
                        }
                        type = path_1.default.extname(key).substr(1);
                        if (fs_extra_1.default.existsSync(value)) {
                            value = fs_extra_1.default.readFileSync(value, 'utf-8');
                        }
                        if (!value) {
                            throw new Error('请输入 value （value 可以为具体的文件路径）');
                        }
                        if (othersParams.includes('-d')) {
                            domainTagIndex = othersParams.indexOf('-d');
                            domain = othersParams[domainTagIndex + 1];
                            if (!domain) {
                                throw new Error('请指定domain');
                            }
                        }
                        else {
                            sPath = path_1.default.join(process.cwd(), 's.yaml');
                            if (fs_extra_1.default.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
                                yamlObj = js_yaml_1.default.load(fs_extra_1.default.readFileSync(sPath, 'utf-8'));
                                domain = lodash_get_1.default(yamlObj, 'vars.domain');
                                if (!domain) {
                                    throw new Error('检测到当前配置文件中不存在domain ，请按在变量vars 下添加domain属性');
                                }
                            }
                            else {
                                throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
                            }
                        }
                        if (type === 'json') {
                            try {
                                value = JSON.parse(value);
                            }
                            catch (e) {
                            }
                        }
                        else {
                            type = 'text/plain';
                        }
                        return [4 /*yield*/, request_1.putKeyValue({ domain: domain, key: key, value: value, type: type })];
                    case 2:
                        _d.sent();
                        return [2 /*return*/, '创建/更新成功'];
                }
            });
        });
    };
    /**
     * 查询所有的keys 信息
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.list = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, args, credentials, project, argsArr, othersParams, domain, domainTagIndex, sPath, yamlObj, result, keys;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.args, args = _a === void 0 ? '' : _a, credentials = inputs.credentials, project = inputs.project;
                        return [4 /*yield*/, this.setEnv(credentials, project.access)];
                    case 1:
                        _b.sent();
                        argsArr = args.split(/\s/);
                        othersParams = argsArr.slice(2);
                        domain = '';
                        if (othersParams.includes('-d')) {
                            domainTagIndex = othersParams.indexOf('-d');
                            domain = othersParams[domainTagIndex + 1];
                            if (!domain) {
                                throw new Error('请指定domain');
                            }
                        }
                        else {
                            sPath = path_1.default.join(process.cwd(), 's.yaml');
                            if (fs_extra_1.default.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
                                yamlObj = js_yaml_1.default.load(fs_extra_1.default.readFileSync(sPath, 'utf-8'));
                                domain = lodash_get_1.default(yamlObj, 'vars.domain');
                                if (!domain) {
                                    throw new Error('检测到当前配置文件中不存在domain ，请按在变量vars 下添加domain属性');
                                }
                            }
                            else {
                                throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
                            }
                        }
                        return [4 /*yield*/, request_1.listKeyValue({ domain: domain })];
                    case 2:
                        result = _b.sent();
                        keys = lodash_get_1.default(result, 'data.keys');
                        return [2 /*return*/, "\u8FD4\u56DE\u7684keys: " + keys];
                }
            });
        });
    };
    /**
     * 根据指定的key获取其值
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.get = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, args, credentials, project, argsArr, key, othersParams, domain, domainTagIndex, sPath, yamlObj, result, value;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.args, args = _a === void 0 ? '' : _a, credentials = inputs.credentials, project = inputs.project;
                        return [4 /*yield*/, this.setEnv(credentials, project.access)];
                    case 1:
                        _b.sent();
                        argsArr = args.split(/\s/);
                        key = argsArr.slice(0, 2)[0];
                        if (!key) {
                            throw new Error('请输入 key');
                        }
                        othersParams = argsArr.slice(2);
                        domain = '';
                        if (othersParams.includes('-d')) {
                            domainTagIndex = othersParams.indexOf('-d');
                            domain = othersParams[domainTagIndex + 1];
                            if (!domain) {
                                throw new Error('请指定domain');
                            }
                        }
                        else {
                            sPath = path_1.default.join(process.cwd(), 's.yaml');
                            if (fs_extra_1.default.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
                                yamlObj = js_yaml_1.default.load(fs_extra_1.default.readFileSync(sPath, 'utf-8'));
                                domain = lodash_get_1.default(yamlObj, 'vars.domain');
                                if (!domain) {
                                    throw new Error('检测到当前配置文件中不存在domain ，请按在变量vars 下添加domain属性');
                                }
                            }
                            else {
                                throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
                            }
                        }
                        return [4 /*yield*/, request_1.getKeyValue({ domain: domain, key: key })];
                    case 2:
                        result = _b.sent();
                        value = lodash_get_1.default(result, 'data.value');
                        return [2 /*return*/, key + "\u7684\u503C\u4E3A: " + value];
                }
            });
        });
    };
    /**
     * 删除指定的key 及其内容
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.delete = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, args, credentials, project, argsArr, key, othersParams, domain, domainTagIndex, sPath, yamlObj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.args, args = _a === void 0 ? '' : _a, credentials = inputs.credentials, project = inputs.project;
                        return [4 /*yield*/, this.setEnv(credentials, project.access)];
                    case 1:
                        _b.sent();
                        argsArr = args.split(/\s/);
                        key = argsArr.slice(0, 2)[0];
                        if (!key) {
                            throw new Error('请输入 key');
                        }
                        othersParams = argsArr.slice(2);
                        domain = '';
                        if (othersParams.includes('-d')) {
                            domainTagIndex = othersParams.indexOf('-d');
                            domain = othersParams[domainTagIndex + 1];
                            if (!domain) {
                                throw new Error('请指定domain');
                            }
                        }
                        else {
                            sPath = path_1.default.join(process.cwd(), 's.yaml');
                            if (fs_extra_1.default.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
                                yamlObj = js_yaml_1.default.load(fs_extra_1.default.readFileSync(sPath, 'utf-8'));
                                domain = lodash_get_1.default(yamlObj, 'vars.domain');
                                if (!domain) {
                                    throw new Error('检测到当前配置文件中不存在domain ，请按在变量vars 下添加domain属性');
                                }
                            }
                            else {
                                throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
                            }
                        }
                        return [4 /*yield*/, request_1.deleteKeyValue({ domain: domain, key: key })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, '删除成功'];
                }
            });
        });
    };
    /**
     *
     * @param inputs
     */
    ComponentDemo.prototype.token = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, argsObj, credentials, project, domain, domainTagIndex, sPath, yamlObj, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.argsObj, argsObj = _a === void 0 ? [] : _a, credentials = inputs.credentials, project = inputs.project;
                        return [4 /*yield*/, this.setEnv(credentials, project.access)];
                    case 1:
                        _b.sent();
                        domain = '';
                        if (argsObj.includes('-d')) {
                            domainTagIndex = argsObj.indexOf('-d');
                            domain = argsObj[domainTagIndex + 1];
                            if (!domain) {
                                throw new Error('请指定domain');
                            }
                        }
                        else {
                            sPath = path_1.default.join(process.cwd(), 's.yaml');
                            if (fs_extra_1.default.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
                                yamlObj = js_yaml_1.default.load(fs_extra_1.default.readFileSync(sPath, 'utf-8'));
                                domain = lodash_get_1.default(yamlObj, 'vars.domain');
                                if (!domain) {
                                    throw new Error('检测到当前配置文件中不存在domain ，请按在变量vars 下添加domain属性');
                                }
                            }
                            else {
                                throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
                            }
                        }
                        if (!domain) { // 如果有配置文件，则去解析配置文件path
                            throw new Error('请输入domain,');
                        }
                        return [4 /*yield*/, request_1.getToken({ domain: domain })];
                    case 2:
                        data = _b.sent();
                        if (data.success) {
                            return [2 /*return*/, lodash_get_1.default(data, 'data.token', '')];
                        }
                        return [2 /*return*/, 'token 获取失败，请检查域名'];
                }
            });
        });
    };
    /**
     * 配合配置文件进行上传
     * @param inputs
     * @returns
     */
    ComponentDemo.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, project, props, key, _a, value, domain, type, fileType;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        credentials = inputs.credentials, project = inputs.project, props = inputs.props;
                        return [4 /*yield*/, this.setEnv(credentials, project.access)];
                    case 1:
                        _b.sent();
                        key = props.key, _a = props.value, value = _a === void 0 ? '' : _a, domain = props.domain;
                        type = 'text/plain';
                        value = path_1.default.join(process.cwd(), value);
                        if (fs_extra_1.default.existsSync(value)) {
                            fileType = path_1.default.extname(value).substr(1);
                            type = fileType;
                            value = fs_extra_1.default.readFileSync(value, 'utf-8');
                        }
                        if (!key) {
                            throw new Error('请填写 key');
                        }
                        if (!value) {
                            throw new Error('请填写 value （value 可以为具体的文件路径）');
                        }
                        if (!domain) { // 如果有配置文件，则去解析配置文件path
                            throw new Error('请输入domain');
                        }
                        if (type === 'json') {
                            value = JSON.parse(value);
                        }
                        return [4 /*yield*/, request_1.putKeyValue({ domain: domain, key: key, value: value, type: type })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, '创建/更新成功'];
                }
            });
        });
    };
    /**
     * api 主动创建key value
     * @param param0
     */
    ComponentDemo.prototype.putApi = function (_a) {
        var domain = _a.domain, key = _a.key, value = _a.value, type = _a.type, credentials = _a.credentials;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        process.env.accessKey = credentials.AccessKeyID;
                        process.env.accessSecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, request_1.putKeyValue({ domain: domain, key: key, value: value, type: type })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
    * api 获取具体的key
    * @param param0
    */
    ComponentDemo.prototype.getApi = function (_a) {
        var domain = _a.domain, key = _a.key, credentials = _a.credentials;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        process.env.accessKey = credentials.AccessKeyID;
                        process.env.accessSecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, request_1.getKeyValue({ domain: domain, key: key })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
  * api 查看key 列表
  * @param param0
  */
    ComponentDemo.prototype.listApi = function (_a) {
        var domain = _a.domain, credentials = _a.credentials;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        process.env.accessKey = credentials.AccessKeyID;
                        process.env.accessSecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, request_1.listKeyValue({ domain: domain })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
    * api 主动删除key value
    * @param param0
    */
    ComponentDemo.prototype.deleteApi = function (_a) {
        var domain = _a.domain, key = _a.key, credentials = _a.credentials;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        process.env.accessKey = credentials.AccessKeyID;
                        process.env.accessSecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, request_1.deleteKeyValue({ domain: domain, key: key })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXdCO0FBQ3hCLDBDQUFvQjtBQUNwQixzREFBMEI7QUFDMUIsb0RBQTJCO0FBQzNCLDhDQUFzRDtBQUN0RCx1REFBMEM7QUFHMUMsMERBQTZCO0FBQzdCLDRDQUFvRztBQUVwRyw2QkFBNkI7QUFDN0Isd0NBQXdDO0FBQ3hDLHlDQUF5QztBQUN6QyxzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBQ3ZDLHdDQUF3QztBQUN4Qyx5Q0FBeUM7QUFDekMsdUNBQXVDO0FBQ3ZDLDJDQUEyQztBQUMzQyxxREFBcUQ7QUFDckQsK0NBQStDO0FBQy9DLDZDQUE2QztBQUM3QyxtREFBbUQ7QUFDbkQscUNBQXFDO0FBQ3JDLElBQUk7QUFFSjtJQUEyQyxpQ0FBYTtJQUN0RCx1QkFBWSxLQUFLO2VBQ2Ysa0JBQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNhLDhCQUFNLEdBQXBCLFVBQXFCLFdBQXlCLEVBQUUsU0FBcUI7UUFBckIsMEJBQUEsRUFBQSxxQkFBcUI7Ozs7Ozs2QkFDL0QsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUF4Qix3QkFBd0I7d0JBQ3BCLFVBQVUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7d0JBQzFELGNBQWMsR0FBRyxpQkFBSSxDQUFDLElBQUksQ0FBQyxrQkFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7NkJBQzFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBekIsd0JBQXlCO3dCQUNiLHFCQUFNLG9CQUFhLENBQUMsU0FBUyxDQUFDLEVBQUE7O3dCQUE1QyxXQUFX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