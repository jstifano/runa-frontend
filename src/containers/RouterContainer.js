import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import LoginComponent from '../components/auth/LoginComponent';
import AdminDashboardComponent from '../components/admin_dashboard/AdminDashboardComponent';
import TableEntryByEmployee from '../components/admin_dashboard/TableEntryByEmployee';
import FormEditEmployee from '../components/admin_dashboard/FormEditEmployee';

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
          <Route exact path="/admin" component={AdminDashboardComponent} />
          <Route exact path="/entries/:id" component={TableEntryByEmployee} />
          <Route exact path="/employee/edit/:id" component={FormEditEmployee} />
        </Switch>
      </Router>
    )
  }
}

export default connect(null, null)(RouterContainer);