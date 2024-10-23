# k3-cloud-web-api-client

金蝶 K3 Cloud 云星空 Web API Nodejs 客户端

安装后使用：

```typescript
import {K3CloudWebAPIClient} from 'k3-cloud-web-api-client';

const client = new K3CloudWebAPIClient({
    url: 'https://k3-clound-url';
    acctid: 'acctid';
    username: 'username';
    password: 'password';
});

const result = client.executeBillQuery({
    FormId:'BD_MATERIAL',
    FieldKeys:'FNumber,FName'
});

```