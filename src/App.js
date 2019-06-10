import React, { Component } from 'react';
import RouterContainer from './containers/RouterContainer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return (
      <div className="App">
        <RouterContainer />
      </div>
    );
  }
}

export default App;
