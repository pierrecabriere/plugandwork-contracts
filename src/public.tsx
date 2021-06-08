import * as React from 'react';

// Styles
import './index.scss';
// Keep it
require('./index.css');

class ExampleAppPublic extends React.Component<any, any> {
  render() {
    return (
      <div>
        Hello world !
      </div>
    );
  }
}

// @ts-ignore
export default ExampleAppPublic as React.Component;