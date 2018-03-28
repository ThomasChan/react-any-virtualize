## React-AnyVirtualize

```html
<div id="__div"></div>
```

```jsx
import React from 'react';
import { render } from 'react-dom';

import AnyVirtualize from '../src';

class App extends React.PureComponent {

  render() {
    const children = [];
    for (let i = 0; i < 10000; i++) {
      children.push(<div key={i} style={{ fontSize: 22, height: 40, lineHeight: '40px', paddingLeft: 20, border: '1px solid #000' }}>{i}</div>);
    }
    return <div>
      <h2>测试 1 万行列表</h2>
      <AnyVirtualize
        perHeight={40}
        style={{ height: 800 }}>
        {children}
      </AnyVirtualize>
    </div>;
  }

}

render(<App />, document.getElementById('__div'));
```
