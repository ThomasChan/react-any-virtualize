# React AnyVirtualize

## Example

- [Online example](http://chenjunhao.cn/react-any-virtualize)
- local example
  ```sh
  $ git clone git@github.com:thomaschan/react-any-virtualize.git
  $ npm install
  $ npm run doc
  ```

## Installation & Usage

```sh
npm install react-any-virtualize --save
```

### Include the Component

```js
import React from 'react';
import AnyVirtualize from 'react-any-virtualize';

class App extends React.PureComponent {

  render() {
    const children = [];
    for (let i = 0; i < 10000; i++) {
      children.push(<div style={{ fontSize: 22, border: '1px solid #000' }}>{i}</div>);
    }
    return <div>
      <h2>测试 1 万行列表</h2>
      <AnyVirtualize
        perHeight={30}
        style={{ height: 800 }}>
        {children}
      </AnyVirtualize>
    </div>;
  }

}
```
