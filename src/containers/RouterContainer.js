import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { login } from '../ducks/modules/users';
import LoginComponent from '../components/LoginComponent';

class RouterContainer extends Component {

  render() {
    // Actual pathname
    const current = window.location.pathname;

    let display;
    
    const spl = current.split("/");
    
    switch (spl[1]) {
      case '/':
        display = "Login";
        break;
      case 'login':
        display = "Login";
        break;
      case 'admin':
        display = "Dashboard | Administrador";
        break;
      case 'employee':
        display = "Dashboard | Empleado"
        break;
      default:
        display = "Prueba Runa";
    }

    document.title = display || "Prueba Runa";
    return (
      <Router>
        <Switch location={this.props.location}>
          <Route exact path="/" render={()=> <Redirect to="/login" />}/>
          <Route exact path="/login" component={LoginComponent} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (email, password) => {
      dispatch(login(email, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer);