Jamstack KV组件说明
=================

针对Jamstack项目提供对应的KV的功能，扩展静态站点的动态功能。

# 使用场景

为Jamstack静态站点提供基于KV的动态特性，主要包括KV Front和KV HTTP两部分功能。

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

KV的操作主要包括put/get/delete和list，使用方法如下：

```
s cli kv put <key> <value> -d <domain> // 创建/更新<domain>下的 kv,value 可以指定为文件
s cli kv get <key> -d <domain> // 获取 <domain>下的 kv,value 可以指定为文件
s cli kv delete <key> -d <domain> // 删除 <domain>下的 kv,value 可以指定为文件
s cli kv list -d <domain> // 获取<domain>下的 kv
```

如果当前目录下的s.yaml文件已经包含如下的域名设置，你就不用添加`-d domain`选项。

```yaml
edition: 1.0.0
vars:
  domain: example.resume.net.cn
```

KV的put操作样例如下： 

* 基于命令行字符串上传KV： `s cli kv put profile.json '{"id": 1}' `
* 基于文件上传KV： `s cli kv put profile.json ./profile.json`


### REST API集成
使用REST API操作KV，你首先需要获得一个token，对应的命令行为 `s cli kv token`。 

接下来你就可以使用标准的HTTP方式度KV进行操作，`Authorization`HTTP头会包含token信息，样例如下：

```http request
POST https://s.devsapp.cn/kv/put/example.resume.net.cn/demo.json
Content-Type: application/json
Authorization: Bear your_token_here

{"id": 1, "name": "KV Front" }
```

对应的curl命令如下： 

```shell
curl -X POST --location "https://s.devsapp.cn/kv/put/example.resume.net.cn/demo.json" \
-H "Content-Type: application/json" \
-H "Authorization: Bear your_token_here" \
-d @demo.json
```

KV对应的API列表如下： 

* POST /kv/put/{domain}/{kv_file_name}: 创建或者更新KV
* GET /kv/get/{domain}/{kv_file_name}: 获取KV的信息
* POST /kv/delete/{domain}/{kv_file_name}: 删除KV
* GET /kv/keys/{domain}/{page:0}:  列出域名下的KV的名称列表，每页50个
