---
sidebar_position: 0
---

# React 中的思考

React 可以改变您对所看到的设计和构建的应用程序的看法。当您使用 React 构建用户界面时，您首先会将其分解为称为组件的部分。然后，您将描述每个组件的不同视觉状态。最后，您会将组件连接在一起，以便数据流经它们。在本教程中，我们将引导您完成使用 React 构建可搜索产品数据表的思考过程。

## 从模型开始

想象一下，您已经拥有一个 JSON API 和来自设计师的模型。

JSON API 返回一些如下所示的数据：

```js
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
```

模型看起来像这样：

<div style={{textAlign:'center'}}>
  <img style={{width:'30%'}} src="https://react.dev/images/docs/s_thinking-in-react_ui.png"/>
</div>

要在 React 中实现 UI，您通常会遵循相同的五个步骤。

## 第 1 步：将 UI 分解为组件层次结构

首先在模型中的每个组件和子组件周围绘制框并命名它们。如果您与设计师合作，他们可能已经在他们的设计工具中命名了这些组件。问他们！

根据您的背景，您可以考虑以不同的方式将设计拆分为组件：

- Programming —— 使用相同的技术来决定是否应该创建一个新函数或对象。一种这样的技术是单一责任原则，也就是说，理想情况下，一个组件应该只做一件事。如果它最终增长，则应将其分解为更小的子组件。
- CSS —— 考虑一下你要为什么创建类选择器。 （但是，组件的粒度有点小。）
- Design —— 考虑如何组织设计的层次。

如果您的 JSON 结构良好，您通常会发现它自然地映射到 UI 的组件结构。这是因为 UI 和数据模型通常具有相同的信息架构——即相同的形状。将您的 UI 分成多个组件，其中每个组件都与您的数据模型的一部分相匹配。

此屏幕上有五个组件：

<div style={{textAlign:'center'}}>
  <img style={{width:'50%'}} src="https://react.dev/images/docs/s_thinking-in-react_ui_outline.png"/>
</div>

1. FilterableProductTable （灰色）包含整个应用程序。
1. SearchBar （蓝色）接收用户输入。
1. ProductTable （淡紫色）根据用户输入显示和过滤列表。
1. ProductCategoryRow （绿色）显示每个类别的标题。
1. ProductRow （黄色）为每个产品显示一行。

如果您查看 `ProductTable` （淡紫色），您会发现表格标题（包含“名称”和“价格”标签）不是它自己的组件。这是一个偏好问题，你可以选择任何一种方式。对于这个例子，它是 `ProductTable` 的一部分，因为它出现在 `ProductTable` 的列表中。但是，如果此标头变得复杂（例如，如果您添加排序），您可以将其移动到它自己的 `ProductTableHeader` 组件中。

现在您已经确定了模型中的组件，将它们排列成层次结构。出现在模型中另一个组件中的组件应该在层次结构中显示为子组件：

- FilterableProductTable
  - SearchBar
  - ProductTable
    - ProductCategoryRow
    - ProductRow

## 第 2 步：在 React  中构建静态版本

现在您有了组件层次结构，是时候实施您的应用程序了。最直接的方法是构建一个从您的数据模型呈现 UI 的版本，而不添加任何交互性……但是！首先构建静态版本然后再添加交互性通常更容易。构建静态版本需要大量输入而不是思考，但添加交互性需要大量思考而不是大量输入。

要构建呈现数据模型的应用程序的静态版本，您需要构建可重用其他组件并使用 `props` 传递数据的组件。道具是一种将数据从父母传递给孩子的方式。 （如果您熟悉 `state` 的概念，请完全不要使用 `state` 来构建此静态版本。State 仅用于交互性，即随时间变化的数据。由于这是应用程序的静态版本，你不需要它。）

您可以通过从构建层次结构中较高的组件（如 `FilterableProductTable` ）开始“自上而下”构建，也可以通过从较低的组件开始构建（如 `ProductRow` ）“自下而上”。在更简单的示例中，自上而下通常更容易，而在较大的项目中，自下而上更容易。

```jsx live


function App() {

  function ProductCategoryRow({ category }) {
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
  
  function ProductRow({ product }) {
    const name = product.stocked ? product.name :
      <span style={{ color: 'red' }}>
        {product.name}
      </span>;
  
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
  
  function ProductTable({ products }) {
    const rows = [];
    let lastCategory = null;
  
    products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });
  
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  
  function SearchBar() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <label>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </label>
      </form>
    );
  }
  
  function FilterableProductTable({ products }) {
    return (
      <div>
        <SearchBar />
        <ProductTable products={products} />
      </div>
    );
  }

  const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
  ];
  return <FilterableProductTable products={PRODUCTS} />;
}

```
（如果此代码看起来令人生畏，请先阅读[快速入门](/docs/%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B/)！）

构建组件后，您将拥有一个呈现数据模型的可重用组件库。因为这是一个静态应用程序，组件将只返回 JSX。层次结构顶部的组件 ( `FilterableProductTable` ) 会将您的数据模型作为道具。这称为单向数据流，因为数据从顶层组件向下流到树底部的组件。

> 注意: 此时，您不应使用任何状态值。这是下一步！
