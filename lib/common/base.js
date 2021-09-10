"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var tty_table_1 = __importDefault(require("tty-table"));
var lodash_1 = __importDefault(require("lodash"));
var methodParamsMap = {
    delete: '<key> [? -d <domain> -a <accessAlias>]',
    get: '<key> [? -d <domain> -a <accessAlias>]',
    list: '-d [? <domain> -a <accessAlias>]',
    put: '<key> <value>(可指定为文件路径) [? -d <domain> -a <accessAlias>]',
};
var BaseComponent = /** @class */ (function () {
    function BaseComponent(inputs) {
        this.inputs = inputs;
        var libBasePath = this.__getBasePath();
        var pkgPath = path_1.default.join(libBasePath, '..', 'package.json');
        if (pkgPath) {
            var pkg = JSON.parse(fs_1.default.readFileSync(path_1.default.join(pkgPath), 'utf8'));
            this.name = pkg.name;
        }
    }
    BaseComponent.prototype.__getBasePath = function () {
        if (this.basePath) {
            return this.basePath;
        }
        var baseName = path_1.default.basename(__dirname);
        if (baseName !== 'lib') {
            this.basePath = path_1.default.join(__dirname, '..');
        }
        else {
            this.basePath = __dirname;
        }
        return this.basePath;
    };
    BaseComponent.prototype.__doc = function (projectName) {
        var libBasePath = this.__getBasePath();
        var docPath = path_1.default.join(libBasePath, '..', 'doc', 'doc.json');
        if (fs_1.default.existsSync(docPath)) {
            var fileContent = fs_1.default.readFileSync(docPath).toString();
            var result = JSON.parse(fileContent);
            var options = {
                borderStyle: 'solid',
                borderColor: 'blue',
                headerAlign: 'center',
                align: 'left',
                color: 'cyan',
                width: '100%',
            };
            var header = [
                {
                    value: '方法',
                    headerColor: 'cyan',
                    color: 'cyan',
                    align: 'left',
                    width: 'auto',
                    formatter: function (value) {
                        return value;
                    },
                },
                {
                    value: '方法说明',
                    headerColor: 'cyan',
                    color: 'cyan',
                    align: 'left',
                    width: 'auto',
                    formatter: function (value) {
                        return value;
                    },
                },
                {
                    value: '入参示例',
                    headerColor: 'cyan',
                    color: 'cyan',
                    align: 'left',
                    width: 'auto',
                    formatter: function (value) {
                        return value;
                    },
                },
                {
                    value: '命令行调用示例',
                    headerColor: 'cyan',
                    color: 'cyan',
                    align: 'left',
                    width: 'auto',
                    formatter: function (value) {
                        return value;
                    },
                },
            ];
            var rows_1 = [];
            var data = lodash_1.default.get(result, 'children[0].children', []).filter(function (item) { return item.kindString === 'Method' && lodash_1.default.get(item, 'flags.isPublic'); });
            var cliStr_1 = projectName ? "s " + projectName : "s cli " + this.name; // 独立组件执行使用cli
            data.forEach(function (item) {
                var params = lodash_1.default.get(item, 'signatures[0].parameters[0]', {});
                var paramText = lodash_1.default.get(params, 'comment.text', '');
                rows_1.push([
                    item.name,
                    lodash_1.default.get(item, 'signatures[0].comment.shortText', ''),
                    paramText,
                    cliStr_1 + " " + item.name + " " + (methodParamsMap[item.name] || ''),
                ]);
            });
            return (0, tty_table_1.default)(header, rows_1, options).render();
        }
        else {
            return 'not found doc content';
        }
    };
    return BaseComponent;
}());
exports.default = BaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBDQUFvQjtBQUNwQiw4Q0FBd0I7QUFDeEIsd0RBQThCO0FBQzlCLGtEQUF1QjtBQUV2QixJQUFNLGVBQWUsR0FBRztJQUN0QixNQUFNLEVBQUUsd0NBQXdDO0lBQ2hELEdBQUcsRUFBRSx3Q0FBd0M7SUFDN0MsSUFBSSxFQUFFLGtDQUFrQztJQUN4QyxHQUFHLEVBQUUsMERBQTBEO0NBQ2hFLENBQUM7QUFFRjtJQUtFLHVCQUFzQixNQUFXO1FBQVgsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUMvQixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekMsSUFBTSxPQUFPLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzdELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQscUNBQWEsR0FBYjtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdEI7UUFDRCxJQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVD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