import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import AllVideo from './pages/AllVideo'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/:bucket/show_all_videos" component={AllVideo}/>
        </div>
      </Router>
    );
  }
}

export default App;
