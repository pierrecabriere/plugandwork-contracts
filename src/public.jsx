import * as React from 'react';
import "./index.css"

class ExampleAppPublic extends React.Component {
  render() {
    return (
      <main className="max-w-3xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1>Hello contact/public !</h1>
        <p>Contact id is : <strong>{this.props.contact}</strong>, you can now make requests through <strong>@plugandwork/core-ui</strong> models.</p>
      </main>
    );
  }
}

export default ExampleAppPublic;