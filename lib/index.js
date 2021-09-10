"use strict";
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
var mime_1 = __importDefault(require("mime"));
var core_1 = require("@serverless-devs/core");
var base_1 = __importDefault(require("./common/base"));
var lodash_1 = __importDefault(require("lodash"));
var request_1 = require("./common/request");
function getKeyContentType(key) {
    return mime_1.default.getType(key) || 'text/plain';
}
function getDomain(othersParams) {
    var domain = '';
    if (othersParams.includes('-d')) {
        var domainTagIndex = othersParams.indexOf('-d');
        domain = othersParams[domainTagIndex + 1];
        if (!domain) {
            throw new Error("请使用 '-d domain' 指定domain");
        }
    }
    else {
        var sPath = path_1.default.join(process.cwd(), 's.yaml');
        if (fs_extra_1.default.existsSync(sPath)) {
            // 如果有s.yaml配置文件，则去解析配置文件path
            var yamlObj = js_yaml_1.default.load(fs_extra_1.default.readFileSync(sPath, 'utf-8'));
            domain = lodash_1.default.get(yamlObj, 'vars.domain');
            if (!domain) {
                throw new Error('检测到当前配置文件s.yaml中不存在domain ，请在vars元素下添加domain属性');
            }
        }
        else {
            throw new Error("没有检测到s.yaml配置文件，你可以通过 '-d domain' 指定domain");
        }
    }
    return domain;
}
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
                        accessFileInfo = js_yaml_1.default.load(fs_extra_1.default.readFileSync(accessFile, 'utf8') || '{}');
                        if (!accessFileInfo[aliasName]) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, core_1.getCredential)(aliasName)];
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
            var _a, argsObj, credentials, project, othersParams, domain, _b, key, _c, value, type;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = inputs.argsObj, argsObj = _a === void 0 ? [] : _a, credentials = inputs.credentials, project = inputs.project;
                        return [4 /*yield*/, this.setEnv(credentials, project.access)];
                    case 1:
                        _d.sent();
                        othersParams = argsObj.slice(2);
                        domain = getDomain(othersParams);
                        _b = argsObj.slice(0, 2), key = _b[0], _c = _b[1], value = _c === void 0 ? '' : _c;
                        if (!key) {
                            throw new Error('请输入 key');
                        }
                        type = getKeyContentType(key);
                        if (fs_extra_1.default.existsSync(value)) {
                            value = fs_extra_1.default.readFileSync(value, 'utf-8');
                        }
                        if (!value) {
                            throw new Error('请输入 value （value 可以为具体的文件路径）');
                        }
                        if (type === 'application/json' || type === 'json') {
                            try {
                                value = JSON.parse(value);
                            }
                            catch (e) { }
                        }
                        return [4 /*yield*/, (0, request_1.putKeyValue)({ domain: domain, key: key, value: value, type: type })];
                    case 2:
                        _d.sent();
                        return [2 /*return*/, key + " \u521B\u5EFA/\u66F4\u65B0\u6210\u529F"];
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
            var _a, args, credentials, project, argsArr, othersParams, domain, result, keys;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.args, args = _a === void 0 ? '' : _a, credentials = inputs.credentials, project = inputs.project;
                        return [4 /*yield*/, this.setEnv(credentials, project.access)];
                    case 1:
                        _b.sent();
                        argsArr = args.split(/\s/);
                        othersParams = argsArr.slice(2);
                        domain = getDomain(othersParams);
                        return [4 /*yield*/, (0, request_1.listKeyValue)({ domain: domain })];
                    case 2:
                        result = _b.sent();
                        keys = lodash_1.default.get(result, 'data.keys');
                        return [2 /*return*/, "KV\u5217\u8868:\n " + keys];
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
            var _a, args, credentials, project, argsArr, key, othersParams, domain, result, value;
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
                        domain = getDomain(othersParams);
                        return [4 /*yield*/, (0, request_1.getKeyValue)({ domain: domain, key: key })];
                    case 2:
                        result = _b.sent();
                        value = lodash_1.default.get(result, 'data.value');
                        return [2 /*return*/, key + "\u7684\u503C\u4E3A: \n" + value];
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
            var _a, args, credentials, project, argsArr, key, othersParams, domain;
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
                        domain = getDomain(othersParams);
                        return [4 /*yield*/, (0, request_1.deleteKeyValue)({ domain: domain, key: key })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, key + " \u5220\u9664\u6210\u529F"];
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
            var _a, argsObj, credentials, project, domain, data, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = inputs.argsObj, argsObj = _a === void 0 ? [] : _a, credentials = inputs.credentials, project = inputs.project;
                        return [4 /*yield*/, this.setEnv(credentials, project.access)];
                    case 1:
                        _b.sent();
                        domain = getDomain(argsObj);
                        return [4 /*yield*/, (0, request_1.getToken)({ domain: domain })];
                    case 2:
                        data = _b.sent();
                        if (data.success) {
                            token = lodash_1.default.get(data, 'data.token', '');
                            return [2 /*return*/, "\u4F60\u7684KV Token\u4E3A\uFF1A " + token + "  \u8BF7\u59A5\u5584\u4FDD\u5B58\uFF01"];
                        }
                        return [2 /*return*/, 'KV Token 获取失败，请检查域名'];
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
            var credentials, project, props, key, _a, value, domain, type;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        credentials = inputs.credentials, project = inputs.project, props = inputs.props;
                        return [4 /*yield*/, this.setEnv(credentials, project.access)];
                    case 1:
                        _b.sent();
                        key = props.key, _a = props.value, value = _a === void 0 ? '' : _a, domain = props.domain;
                        type = getKeyContentType(key);
                        value = path_1.default.join(process.cwd(), value);
                        if (fs_extra_1.default.existsSync(value)) {
                            value = fs_extra_1.default.readFileSync(value, 'utf-8');
                        }
                        if (!key) {
                            throw new Error('请填写 key');
                        }
                        if (!value) {
                            throw new Error('请填写 value （value 可以为具体的文件路径）');
                        }
                        if (!domain) {
                            // 如果有配置文件，则去解析配置文件path
                            throw new Error("请使用 '-d domain' 指定domain");
                        }
                        if (type === 'application/json' || type === 'json') {
                            value = JSON.parse(value);
                        }
                        return [4 /*yield*/, (0, request_1.putKeyValue)({ domain: domain, key: key, value: value, type: type })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, '创建/更新成功'];
                }
            });
        });
    };
    /**
     * api 主动创建key value
     */
    ComponentDemo.prototype.putApi = function (_a) {
        var domain = _a.domain, key = _a.key, value = _a.value, type = _a.type, credentials = _a.credentials;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        process.env.accessKey = credentials.AccessKeyID;
                        process.env.accessSecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, (0, request_1.putKeyValue)({ domain: domain, key: key, value: value, type: type })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * api 获取具体的key
     */
    ComponentDemo.prototype.getApi = function (_a) {
        var domain = _a.domain, key = _a.key, credentials = _a.credentials;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        process.env.accessKey = credentials.AccessKeyID;
                        process.env.accessSecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, (0, request_1.getKeyValue)({ domain: domain, key: key })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * api 查看key 列表
     */
    ComponentDemo.prototype.listApi = function (_a) {
        var domain = _a.domain, credentials = _a.credentials;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        process.env.accessKey = credentials.AccessKeyID;
                        process.env.accessSecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, (0, request_1.listKeyValue)({ domain: domain })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * api 主动删除key value
     */
    ComponentDemo.prototype.deleteApi = function (_a) {
        var domain = _a.domain, key = _a.key, credentials = _a.credentials;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        process.env.accessKey = credentials.AccessKeyID;
                        process.env.accessSecret = credentials.AccessKeySecret;
                        return [4 /*yield*/, (0, request_1.deleteKeyValue)({ domain: domain, key: key })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return ComponentDemo;
}(base_1.default));
exports.default = ComponentDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0I7QUFDeEIsMENBQW9CO0FBQ3BCLHNEQUEwQjtBQUMxQixvREFBMkI7QUFDM0IsOENBQXdCO0FBQ3hCLDhDQUFzRDtBQUN0RCx1REFBMEM7QUFHMUMsa0RBQXVCO0FBRXZCLDRDQUFvRztBQUVwRyxTQUFTLGlCQUFpQixDQUFDLEdBQVc7SUFDcEMsT0FBTyxjQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQztBQUMzQyxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsWUFBc0I7SUFDdkMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMvQixJQUFNLGNBQWMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELE1BQU0sR0FBRyxZQUFZLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDN0M7S0FDRjtTQUFNO1FBQ0wsSUFBTSxLQUFLLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4Qiw2QkFBNkI7WUFDN0IsSUFBTSxPQUFPLEdBQUcsaUJBQUksQ0FBQyxJQUFJLENBQUMsa0JBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0Qs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