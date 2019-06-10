import React, { Component } from "react";
import App from "../App";


class AppContainer extends Component {
  state = {
    data: null
  };

  render() {
    return <App />;
  }
}

export default AppContainer;