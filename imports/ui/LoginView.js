import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

class LoginView extends Component {
  state = {
    view: 'login',
    username: '',
    password: '',
  };

  login = e => {
    e.preventDefault();
    console.log(e);
    const { username, password } = this.state;

    Meteor.loginWithPassword(username, password, err => {
      if (err) throw err;
      console.log('success');
    });
  };

  createUser = e => {
    e.preventDefault();

    console.log(e);
    const { username, password } = this.state;

    Accounts.createUser({
      username,
      password,
    }, (error) => {
      console.log(error);
      console.log('success');
    });

    // Meteor.loginWithPassword(username, password, err => {
    //   if (err) throw err;
    //   console.log('success');
    // });
  };

  handleChange = e => {
    const { name, value } = e.target;
    // this.setState({ username: value });
    this.setState({ [name]: e.target.value });
  };

  render() {
    const { view } = this.state;

    return (
      <div className="login-container">
        <div className="login-content">
          {view === 'login' && (
            <Fragment>
              <h2>Log In</h2>
              <form onSubmit={this.login}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </div>
                <input className="btn" type="submit" value="Log In" />
                <div>
                  Don't have an account?{' '}
                  <span onClick={() => this.setState({ view: 'sign-up' })}>
                    Sign Up
                  </span>
                </div>
              </form>
            </Fragment>
          )}
          {view === 'sign-up' && (
            <Fragment>
              <h2>Sign Up</h2>
              <form onSubmit={this.createUser}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </div>
                <input className="btn" type="submit" value="Log In" />
                <div>
                  Already have an account?{' '}
                  <span onClick={() => this.setState({ view: 'login' })}>
                    Log In
                  </span>
                </div>
              </form>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default LoginView;
