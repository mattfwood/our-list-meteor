import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks';

import Task from './Task';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
  }

  state = {
    newTodo: '',
    hideCompleted: false,
  };

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }

    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  handleChange = event => {
    this.setState({ newTodo: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    Meteor.call('tasks.insert', this.state.newTodo);

    // // Clear form
    this.setState({ newTodo: '' });
  };

  toggleHideCompleted = () => {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  };

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted}
            />
            Hide Completed Tasks
          </label>
          <AccountsUIWrapper />
          {this.props.currentUser ? (
            <form className="new-task" onSubmit={this.handleSubmit}>
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
                onChange={this.handleChange}
                value={this.state.newTodo}
              />
            </form>
          ) : null}
        </header>

        <ul>{this.renderTasks()}</ul>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
