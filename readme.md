## 组件说明
针对jamstack 场景进行kv 操作
## 使用场景

## 具体用法


### s cli 方式

```
s cli kv list -d <domain> // 获取domain 下的 kv

```
```
s cli kv put <key> <value> -d <domain> // 设置 <domain> 下的 kv,value 可以指定为文件

```
```
s cli kv get <key> -d <domain> // 获取 <domain>下的 kv,value 可以指定为文件

```

```
s cli kv delete <key> -d <domain> // 删除 <domain>下的 kv,value 可以指定为文件

```



