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
}
