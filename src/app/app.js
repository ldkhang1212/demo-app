import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component
import Login from './Login'; // Our custom react component

// Routing lib for react
import { hashHistory, Router, Route, Link, withRouter } from 'react-router'


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
//render(<Main />, document.getElementById('app'));



render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}/>
    <Route path="/login" component={Login}/>
  </Router>
), document.getElementById('app'))
