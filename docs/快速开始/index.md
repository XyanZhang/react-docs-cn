---
sidebar_position: 0
---


# 快速开始

欢迎来到React文档！此页面将为您介绍您每天将使用的80％的React概念。

您会学到

- 如何创建和嵌套组件
- 如何添加标记和样式
- 如何显示数据
- 如何呈现条件和列表
- 如何响应事件和更新屏幕
- 如何在组件之间共享数据

## 创建和嵌套组件

React应用程序是由组件组成的。组件是具有其逻辑和外观的UI（用户界面）的一部分。组件可以是按钮，也可以是整个页面。

React 组件是返回标记的 JavaScript 函数：

```jsx
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```

现在您已经声明 Mybutton，可以将其嵌套到另一个组件中：

```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      {/* highlight-start */}
      <MyButton />
      {/* highlight-end */}
    </div>
  );
}
```

请注意，`<Mybutton />`从大写字母开始。这就是您知道这是一个 React 组件。React 组件名称必须始终以大写字母开头，而HTML标签必须是小写。
看看结果：