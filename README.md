##  介绍

从零实现pinia核心源码 不兼容vue2

#### 官网文档入手
```
import { createPinia } from 'pinia'

app.use(createPinia())
```
- pinia 导出一个 createPinia 函数
- createPinia 方法要返回 install方法 这个不多说 [详见](https://cn.vuejs.org/api/application.html#app-use) 