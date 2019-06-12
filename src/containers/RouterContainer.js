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
import FormAddEntry from '../components/admin_dashboard/FormAddEntry';

/********************************************************
* Componente donde se manejaran las rutas master-detail *
* Uso de React-Router para la navegación de la página   *
*********************************************************/
class RouterContainer extends Component {

  render() {
    document.title = "Prueba Runa";
    return (
      <Router>
        <Switch location={this.props.location}>
          <Route exact path="/" render={()=> <Redirect to="/login" />}/>
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/admin" component={AdminDashboardComponent} />
          <Route exact path="/employee/entries/:id" component={TableEntryByEmployee} />
          <Route exact path="/employee/edit/:id" component={FormEditEmployee} />
          <Route exact path="/employee/entry/add/:id" component={FormAddEntry} />
        </Switch>
      </Router>
    )
  }
}

export default connect(null, null)(RouterContainer);