import fs from 'fs';
import path from 'path';
import Table from 'tty-table';
import _ from 'lodash';

const methodParamsMap = {
  delete: '<key> [? -d <domain> -a <accessAlias>]',
  get: '<key> [? -d <domain> -a <accessAlias>]',
  list: '-d [? <domain> -a <accessAlias>]',
  put: '<key> <value>(可指定为文件路径) [? -d <domain> -a <accessAlias>]',
};

export default class BaseComponent {
  protected client;
  private name: string;
  private basePath: string;

  constructor(protected inputs: any) {
    const libBasePath = this.__getBasePath();
    const pkgPath = path.join(libBasePath, '..', 'package.json');
    if (pkgPath) {
      const pkg = JSON.parse(fs.readFileSync(path.join(pkgPath), 'utf8'));
      this.name = pkg.name;
    }
  }

  __getBasePath() {
    if (this.basePath) {
      return this.basePath;
    }
    const baseName = path.basename(__dirname);
    if (baseName !== 'lib') {
      this.basePath = path.join(__dirname, '..');
    } else {
      this.basePath = __dirname;
    }
    return this.basePath;
  }

  __doc(projectName?: string) {
    const libBasePath = this.__getBasePath();
    const docPath = path.join(libBasePath, '..', 'doc', 'doc.json');
    if (fs.existsSync(docPath)) {
      const fileContent: string = fs.readFileSync(docPath).toString();
      const result = JSON.parse(fileContent);
      const options = {
        borderStyle: 'solid',
        borderColor: 'blue',
        headerAlign: 'center',
        align: 'left',
        color: 'cyan',
        width: '100%',
      };
      const header = [
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
      const rows = [];
      const data = _.get(result, 'children[0].children', []).filter((item) => item.kindString === 'Method' && _.get(item, 'flags.isPublic'));
      let cliStr = projectName ? `s ${projectName}` : `s cli ${this.name}`; // 独立组件执行使用cli
      data.forEach((item) => {
        const params = _.get(item, 'signatures[0].parameters[0]', {});
        const paramText = _.get(params, 'comment.text', '');
        rows.push([
          item.name,
          _.get(item, 'signatures[0].comment.shortText', ''),
          paramText,
          `${cliStr} ${item.name} ${methodParamsMap[item.name] || ''}`,
        ]);
      });

      return Table(header, rows, options).render();
    } else {
      return 'not found doc content';
    }
  }
}
