import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class ComponentDemo extends BaseComponent {
    constructor(props: any);
    private setEnv;
    /**
     * 上传kv
     * @param inputs
     * @returns
     */
    put(inputs: InputProps): Promise<string>;
    /**
     * 查询所有的keys 信息
     * @param inputs
     * @returns
     */
    list(inputs: InputProps): Promise<string>;
    /**
     * 根据指定的key获取其值
     * @param inputs
     * @returns
     */
    get(inputs: InputProps): Promise<string>;
    /**
     * 删除指定的key 及其内容
     * @param inputs
     * @returns
     */
    delete(inputs: InputProps): Promise<string>;
    /**
     * 配合配置文件进行上传
     * @param inputs
     * @returns
     */
    deploy(inputs: InputProps): Promise<string>;
    /**
     * api 主动创建key value
     * @param param0
     */
    putApi({ domain, key, value, type, credentials }: {
        domain: any;
        key: any;
        value: any;
        type: any;
        credentials: any;
    }): Promise<any>;
    /**
    * api 获取具体的key
    * @param param0
    */
    getApi({ domain, key, credentials }: {
        domain: any;
        key: any;
        credentials: any;
    }): Promise<any>;
    /**
  * api 查看key 列表
  * @param param0
  */
    listApi({ domain, credentials }: {
        domain: any;
        credentials: any;
    }): Promise<any>;
    /**
    * api 主动删除key value
    * @param param0
    */
    deleteApi({ domain, key, credentials }: {
        domain: any;
        key: any;
        credentials: any;
    }): Promise<any>;
}
