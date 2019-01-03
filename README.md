# ccms-customer-view
> 客户视图组件。临时项目，之后会移至业务组件库。

## 项目结构
- 使用业务组件库的结构，移动至业务组件库时，可以将src下的customer-view迁移即可。

## 项目中引用
- es2015引入方式
```javascript
import ccmsCustomerView from 'ccms-customer-view';
export default angular
	.module('myApp', [ccmsCustomerView])
	.controller('MainController', MainController)
	.name;
```

- 通过script标签引入
```html
<script src="../node_modules/ccms-customer-view/ccms-customer-view.js"></script>
```

## 使用方式
    <customer-view uni-id="uniId" env-name="envName"></customer-view>

### 参数说明
- uniId: 全渠道客户ID
- envName: 环境名称， 如: `https://www.baidu.com`

## 依赖
- ccms-components `组件库`
- ccms-icons `iconfont库`
- gridmanager-angular-1.x `表格组件`
- gridmanager-ccms-skin `表格组件皮肤`

## 可能遇到的问题
- 如果无法打包，执行以下语句: `chmod +x scripts/build.sh`
