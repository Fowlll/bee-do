import React, { Component } from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';

// Style
import './style/main.css';



// Screens
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Tasks from './screens/Tasks';

class App extends Component {

  constructor(props){
    super(props);

  }


  render() {
    return (

      <Router>

        <Switch>

          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/tasks" component={Tasks} />

        </Switch>
        
      </Router>

    );
  }
}

export default App;