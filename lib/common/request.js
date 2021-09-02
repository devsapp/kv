"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteKeyValue = exports.putKeyValue = exports.getKeyValue = exports.listKeyValue = exports.getToken = void 0;
var jwt_token_1 = __importDefault(require("./jwt-token"));
exports.getToken = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, jwt_token_1.default("/project/kvtoken/" + payload.domain, __assign(__assign({}, payload), { method: 'GET' }))];
    });
}); };
exports.listKeyValue = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, jwt_token_1.default("/kv/keys/" + payload.domain, __assign(__assign({}, payload), { method: 'GET' }))];
    });
}); };
exports.getKeyValue = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, jwt_token_1.default("/kv/get/" + payload.domain + "/" + payload.key, __assign(__assign({}, payload), { method: 'GET' }))];
    });
}); };
exports.putKeyValue = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, jwt_token_1.default("/kv/put/" + payload.domain + "/" + payload.key, __assign(__assign({ method: 'POST' }, payload), { body: payload.value }))];
    });
}); };
exports.deleteKeyValue = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, jwt_token_1.default("/kv/delete/" + payload.domain + "/" + payload.key, __assign(__assign({}, payload), { method: 'POST' }))];
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFzQztBQUd6QixRQUFBLFFBQVEsR0FBRyxVQUFPLE9BQU87O1FBQUssc0JBQUEsbUJBQVcsQ0FBQyxzQkFBb0IsT0FBTyxDQUFDLE1BQVEsd0JBQ3BGLE9BQU8sS0FDVixNQUFNLEVBQUUsS0FBSyxJQUNmLEVBQUE7O0tBQUEsQ0FBQTtBQUNXLFFBQUEsWUFBWSxHQUFHLFVBQU8sT0FBTzs7UUFDdEMsc0JBQUEsbUJBQVcsQ0FBQyxjQUFZLE9BQU8sQ0FBQyxNQUFRLHdCQUNqQyxPQUFPLEtBQ1YsTUFBTSxFQUFFLEtBQUssSUFDZixFQUFBOztLQUFBLENBQUM7QUFFTSxRQUFBLFdBQVcsR0FBRyxVQUFPLE9BQU87O1FBQ3JDLHNCQUFBLG1CQUFXLENBQUMsYUFBVyxPQUFPLENBQUMsTUFBTSxTQUFJLE9BQU8sQ0FBQyxHQUFLLHdCQUMvQyxPQUFPLEtBQ1YsTUFBTSxFQUFFLEtBQUssSUFDZixFQUFBOztLQUFBLENBQUM7QUFDTSxRQUFBLFdBQVcsR0FBRyxVQUFPLE9BQU87O1FBQ3JDLHNCQUFBLG1CQUFXLENBQUMsYUFBVyxPQUFPLENBQUMsTUFBTSxTQUFJLE9BQU8sQ0FBQyxHQUFLLHNCQUNsRCxNQUFNLEVBQUUsTUFBTSxJQUNYLE9BQU8sS0FDVixJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFFckIsRUFBQTs7S0FBQSxDQUFDO0FBQ00sUUFBQSxjQUFjLEdBQUcsVUFBTyxPQUFPOztRQUN4QyxzQkFBQSxtQkFBVyxDQUFDLGdCQUFjLE9BQU8sQ0FBQyxNQUFNLFNBQUksT0FBTyxDQUFDLEdBQUssd0JBQ2xELE9BQU8sS0FDVixNQUFNLEVBQUUsTUFBTSxJQUNoQixFQUFBOztLQUFBLENBQUMifQ==