Jamstack KV组件说明
=================

针对Jamstack场景提供KV的功能。

# 使用场景

为Jamstack静态站点提供基于KV的动态特性，主要包括KV Front和KV HTTP

### KV Front

KV Front主要是静态站点提供KV支持，方便后端更新KV数据，浏览器端访问再访问这些KV数据，从而实现静态站点的动态特性。
此外KV Front也可以作为Jamstack站点的临时数据中转，为编译期提供数据支持。

KV Front通过 `https://example.resume.net.cn/~kv/exchange_rate.json` 进行访问。  

### KV HTTP

KV HTTP是一种特殊的HTTP处理方式，由Serverless平台提供对应的HTTP请求转发。 

首先你需要创建一个对应的HTTP文件，如 httpbin-ip.http文件，内容如下： 

```
GET https://httpbin.org/ip
```

接下来你就可以通过 `https://example.resume.net.cn/~kv/httpbin-demo.http` 访问，就可以获得上游HTTP服务的内容响应。

# 具体用法

Jamstack有两者使用方式，一种是s命令行方式，另外一种是通过token方式进行API集成。


### s cli 方式

```
s cli kv put <key> <value> -d <domain> // 设置 <domain> 下的 kv,value 可以指定为文件
s cli kv get <key> -d <domain> // 获取 <domain>下的 kv,value 可以指定为文件
s cli kv delete <key> -d <domain> // 删除 <domain>下的 kv,value 可以指定为文件

s cli kv list -d <domain> // 获取domain 下的 kv
```

### REST API集成
使用REST API操作KV，你首先需要获得一个token，用于操作KV，对应的命令行为 `s cli kv token`   

接下来你就可以使用标准的HTTP方式进行KV操作，样例如下：

```http request
POST https://s.devsapp.cn/kv/put/example.resume.net.cn/demo.json
Content-Type: application/json
Authorization: bear your_token_here

{"id": 1, "name": "KV Front" }
```

对应的curl命令如下： 

```shell
curl -X POST --location "https://s.devsapp.cn/kv/put/example.resume.net.cn/demo.json" \
-H "Content-Type: application/json" \
-H "Authorization: bear your_token_here" \
-d @demo.json
```

KV对应的API列表如下： 

* POST /kv/put/{domain}/{kv_file_name}: 创建或者更新KV
* GET /kv/get/{domain}/{kv_file_name}: 获取KV的信息
* POST /kv/delete/{domain}/{kv_file_name}: 删除KV
* GET /kv/keys/{domain}/{page:0}:  列出域名下的KV的名称列表，每页50个
