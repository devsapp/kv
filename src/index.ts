import path from 'path';
import os from "os";
import fs from 'fs-extra';
import yaml from 'js-yaml';
import {getCredential} from '@serverless-devs/core';
import BaseComponent from './common/base';
// import logger from './common/logger';
import {ICredentials, InputProps} from './common/entity';
import get from 'lodash.get';
import {deleteKeyValue, getKeyValue, getToken, listKeyValue, putKeyValue} from './common/request';


export default class ComponentDemo extends BaseComponent {
  constructor(props) {
    super(props);
  }
  private async setEnv(credentials: ICredentials, aliasName = 'default') {
    if (!credentials.AccessKeyID) {
      const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
      const accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf8') || "{}");
      if (accessFileInfo[aliasName]) {
        credentials = await getCredential(aliasName);
      }
    }
    process.env.accessKey = credentials.AccessKeyID;
    process.env.accessSecret = credentials.AccessKeySecret;

  }
  /**
   * 上传kv
   * @param inputs
   * @returns
   */
  public async put(inputs: InputProps) {
    const { argsObj = [], credentials, project } = inputs;
    await this.setEnv(credentials, project.access);
    const othersParams = argsObj.slice(2);
    let [key, value = ''] = argsObj.slice(0, 2);
    let domain = '';
    if (!key) {
      throw new Error('请输入 key');
    }
    let type = path.extname(key).substr(1);
    if (fs.existsSync(value)) {
      value = fs.readFileSync(value, 'utf-8');
    }
    if (!value) {
      throw new Error('请输入 value （value 可以为具体的文件路径）');
    }

    if (othersParams.includes('-d')) {
      const domainTagIndex = othersParams.indexOf('-d');
      domain = othersParams[domainTagIndex + 1];
      if (!domain) {
        throw new Error("请使用 '-d domain' 指定domain");
      }
    } else {
      const sPath = path.join(process.cwd(), 's.yaml');
      if (fs.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
        const yamlObj = yaml.load(fs.readFileSync(sPath, 'utf-8'));
        domain = get(yamlObj, 'vars.domain');
        if (!domain) {
          throw new Error('检测到当前配置文件s.yaml中不存在domain ，请在vars元素下添加domain属性');
        }
      } else {
        throw new Error("检测到当前没有domain配置，您可以通过 '-d domain' 指定");
      }
    }
    if (type === 'json') {
      try {
        value = JSON.parse(value);
      } catch (e) {

      }
    } else {
      type = 'text/plain';
    }
    await putKeyValue({ domain, key, value, type });
    return `${key} 创建/更新成功`;
  }
  /**
   * 查询所有的keys 信息
   * @param inputs
   * @returns
   */
  public async list(inputs: InputProps) {
    const { args = '', credentials, project } = inputs;

    await this.setEnv(credentials, project.access);
    const argsArr = args.split(/\s/);
    const othersParams = argsArr.slice(2);
    let domain = '';
    if (othersParams.includes('-d')) {
      const domainTagIndex = othersParams.indexOf('-d');
      domain = othersParams[domainTagIndex + 1];
      if (!domain) {
        throw new Error("请使用 '-d domain' 指定domain");
      }
    } else {
      const sPath = path.join(process.cwd(), 's.yaml');
      if (fs.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
        const yamlObj = yaml.load(fs.readFileSync(sPath, 'utf-8'));
        domain = get(yamlObj, 'vars.domain');
        if (!domain) {
          throw new Error('检测到当前配置文件s.yaml中不存在domain ，请在vars元素下添加domain属性');
        }
      } else {
        throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
      }
    }
    const result = await listKeyValue({ domain });
    const keys = get(result, 'data.keys');
    return `KV列表:\n ${keys}`;
  }

  /**
   * 根据指定的key获取其值
   * @param inputs
   * @returns
   */
  public async get(inputs: InputProps) {
    const { args = '', credentials, project } = inputs;
    await this.setEnv(credentials, project.access);
    const argsArr = args.split(/\s/);
    let [key] = argsArr.slice(0, 2);
    if (!key) {
      throw new Error('请输入 key');
    }
    const othersParams = argsArr.slice(2);
    let domain = '';
    if (othersParams.includes('-d')) {
      const domainTagIndex = othersParams.indexOf('-d');
      domain = othersParams[domainTagIndex + 1];
      if (!domain) {
        throw new Error("请使用 '-d domain' 指定domain");
      }
    } else {
      const sPath = path.join(process.cwd(), 's.yaml');
      if (fs.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
        const yamlObj = yaml.load(fs.readFileSync(sPath, 'utf-8'));
        domain = get(yamlObj, 'vars.domain');
        if (!domain) {
          throw new Error('检测到当前配置文件s.yaml中不存在domain ，请在vars元素下添加domain属性');
        }
      } else {
        throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
      }
    }
    const result = await getKeyValue({ domain, key });
    const value = get(result, 'data.value');
    return `${key}的值为: \n${value}`;
  }
  /**
   * 删除指定的key 及其内容
   * @param inputs
   * @returns
   */
  public async delete(inputs: InputProps) {
    const { args = '', credentials, project } = inputs;
    await this.setEnv(credentials, project.access);
    const argsArr = args.split(/\s/);
    let [key] = argsArr.slice(0, 2);
    if (!key) {
      throw new Error('请输入 key');
    }
    const othersParams = argsArr.slice(2);
    let domain = '';
    if (othersParams.includes('-d')) {
      const domainTagIndex = othersParams.indexOf('-d');
      domain = othersParams[domainTagIndex + 1];
      if (!domain) {
        throw new Error("请使用 '-d domain' 指定domain");
      }
    } else {
      const sPath = path.join(process.cwd(), 's.yaml');
      if (fs.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
        const yamlObj = yaml.load(fs.readFileSync(sPath, 'utf-8'));
        domain = get(yamlObj, 'vars.domain');
        if (!domain) {
          throw new Error('检测到当前配置文件s.yaml中不存在domain ，请在vars元素下添加domain属性');
        }
      } else {
        throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
      }
    }
    await deleteKeyValue({ domain, key });

    return `${key} 删除成功`;
  }

  /**
   *
   * @param inputs
   */
  public async token(inputs: InputProps) {
    const { argsObj = [], credentials, project } = inputs;
    await this.setEnv(credentials, project.access);
    let domain = '';

    if (argsObj.includes('-d')) {
      const domainTagIndex = argsObj.indexOf('-d');
      domain = argsObj[domainTagIndex + 1];
      if (!domain) {
        throw new Error("请使用 '-d domain' 指定domain");
      }
    } else {
      const sPath = path.join(process.cwd(), 's.yaml');
      if (fs.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
        const yamlObj = yaml.load(fs.readFileSync(sPath, 'utf-8'));
        domain = get(yamlObj, 'vars.domain');
        if (!domain) {
          throw new Error('检测到当前配置文件s.yaml中不存在domain ，请在vars元素下添加domain属性');
        }
      } else {
        throw new Error("检测到当前没有domain配置，您可以通过 '-d domain' 指定");
      }
    }
    if (!domain) { // 如果有配置文件，则去解析配置文件path
      throw new Error('请输入domain,');
    }
    const data = await getToken({ domain });
    if (data.success) {
      const token= get(data, 'data.token', '');
      return `你的KV Token为： ${token}  请妥善保存！`;
    }
    return 'KV Token 获取失败，请检查域名';
  }

  /**
   * 配合配置文件进行上传
   * @param inputs
   * @returns
   */
  public async deploy(inputs: InputProps) {
    const { credentials, project, props } = inputs;
    await this.setEnv(credentials, project.access);
    let { key, value = '', domain } = props;
    let type = 'text/plain';
    value = path.join(process.cwd(), value);
    if (fs.existsSync(value)) {
      type = path.extname(value).substr(1);
      value = fs.readFileSync(value, 'utf-8');
    }
    if (!key) {
      throw new Error('请填写 key');
    }
    if (!value) {
      throw new Error('请填写 value （value 可以为具体的文件路径）');
    }

    if (!domain) { // 如果有配置文件，则去解析配置文件path
      throw new Error("请使用 '-d domain' 指定domain");
    }
    if (type === 'json') {
      value = JSON.parse(value);
    }
    await putKeyValue({ domain, key, value, type });
    return '创建/更新成功';
  }

  /**
   * api 主动创建key value
   */
  public async putApi({ domain, key, value, type, credentials }) {
    process.env.accessKey = credentials.AccessKeyID;
    process.env.accessSecret = credentials.AccessKeySecret;
    return await putKeyValue({ domain, key, value, type });
  }

  /**
  * api 获取具体的key
  */
  public async getApi({ domain, key, credentials }) {
    process.env.accessKey = credentials.AccessKeyID;
    process.env.accessSecret = credentials.AccessKeySecret;
    return await getKeyValue({ domain, key });
  }

  /**
* api 查看key 列表
*/
  public async listApi({ domain, credentials }) {
    process.env.accessKey = credentials.AccessKeyID;
    process.env.accessSecret = credentials.AccessKeySecret;
    return await listKeyValue({ domain });
  }
  /**
  * api 主动删除key value
  */
  public async deleteApi({ domain, key, credentials }) {
    process.env.accessKey = credentials.AccessKeyID;
    process.env.accessSecret = credentials.AccessKeySecret;
    return await deleteKeyValue({ domain, key });
  }
}
