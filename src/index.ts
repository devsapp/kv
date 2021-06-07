import path from 'path';
import os from "os";
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { getCredential } from '@serverless-devs/core';
import BaseComponent from './common/base';
// import logger from './common/logger';
import { InputProps, ICredentials } from './common/entity';
import get from 'lodash.get';
import { putKeyValue, listKeyValue, getKeyValue, deleteKeyValue } from './common/request';
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
    const { args = '', credentials, project } = inputs;
    await this.setEnv(credentials, project.access);
    const argsArr = args.split(/\s/);
    const othersParams = argsArr.slice(2);
    let [key, value = ''] = argsArr.slice(0, 2);
    let domain = '';
    if (fs.existsSync(value)) {
      value = fs.readFileSync(value, 'utf-8');
    }
    if (!key) {
      throw new Error('请输入 key');
    }
    if (!value || value.indexOf('-') === 0) {
      throw new Error('请输入 value （value 可以为具体的文件路径）');
    }

    if (othersParams.includes('-d')) {
      const domainTagIndex = othersParams.indexOf('-d');
      domain = othersParams[domainTagIndex + 1];
      if (!domain) {
        throw new Error('请指定domain');
      }
    } else {
      const sPath = path.join(process.cwd(), 's.yaml');
      if (fs.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
        const yamlObj = yaml.load(fs.readFileSync(sPath, 'utf-8'));
        domain = get(yamlObj, 'vars.domain');
        if (!domain) {
          throw new Error('检测到当前配置文件中不存在domain ，请按在变量vars 下添加domain属性');
        }
      } else {
        throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
      }
    }
    await putKeyValue({ domain, key, value });
    return '创建/更新成功';
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
        throw new Error('请指定domain');
      }
    } else {
      const sPath = path.join(process.cwd(), 's.yaml');
      if (fs.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
        const yamlObj = yaml.load(fs.readFileSync(sPath, 'utf-8'));
        domain = get(yamlObj, 'vars.domain');
        if (!domain) {
          throw new Error('检测到当前配置文件中不存在domain ，请按在变量vars 下添加domain属性');
        }
      } else {
        throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
      }
    }
    const result = await listKeyValue({ domain });
    const keys = get(result, 'data.keys');
    return `返回的keys: ${keys}`;
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
        throw new Error('请指定domain');
      }
    } else {
      const sPath = path.join(process.cwd(), 's.yaml');
      if (fs.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
        const yamlObj = yaml.load(fs.readFileSync(sPath, 'utf-8'));
        domain = get(yamlObj, 'vars.domain');
        if (!domain) {
          throw new Error('检测到当前配置文件中不存在domain ，请按在变量vars 下添加domain属性');
        }
      } else {
        throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
      }
    }
    const result = await getKeyValue({ domain, key });
    const value = get(result, 'data.value');
    return `${key}的值为: ${value}`;
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
        throw new Error('请指定domain');
      }
    } else {
      const sPath = path.join(process.cwd(), 's.yaml');
      if (fs.existsSync(sPath)) { // 如果有配置文件，则去解析配置文件path
        const yamlObj = yaml.load(fs.readFileSync(sPath, 'utf-8'));
        domain = get(yamlObj, 'vars.domain');
        if (!domain) {
          throw new Error('检测到当前配置文件中不存在domain ，请按在变量vars 下添加domain属性');
        }
      } else {
        throw new Error('检测到当前没有domain配置，您可以通过-d <domain> 指定');
      }
    }
    await deleteKeyValue({ domain, key });

    return '删除成功';
  }
}
