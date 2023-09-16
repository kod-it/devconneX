import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';

//Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import AddEducation from './components/profile-form/AddEducation';
import { NotFound } from './components/layout/NotFound';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <section className='container'>
              <Alert />
              <Switch>
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/profiles' component={Profiles} />
                <Route path='/profile/:id' component={Profile} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <PrivateRoute
                  path='/create-profile'
                  component={CreateProfile}
                />
                <PrivateRoute path='/edit-profile' component={EditProfile} />
                <PrivateRoute
                  path='/add-experience'
                  component={AddExperience}
                />
                <PrivateRoute path='/add-education' component={AddEducation} />
                <PrivateRoute path='/posts/:id' component={Post} />
                <PrivateRoute path='/posts' component={Posts} />
                <Route component={NotFound} />
              </Switch>
            </section>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
