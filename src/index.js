import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import './index.css';
import App from './components/booklist/App';
import registerServiceWorker from './registerServiceWorker';
import Edit from './components/book/Edit';
import Create from './components/book/Create';
import Show from './components/book/Show';
import Register from './components/user/register';
import login from './components/user/login';
import Home from './Home';



ReactDOM.render(
  <Router>
      <div>
        <Route exact path="/" component={Home}/>
        <Route exact path='/booklist' component={App} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />
        <Route path='/show/:id' component={Show} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={login} />
      </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
