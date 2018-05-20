import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { Tasks } from '../api/tasks';
import { Lists } from '../api/lists';

import Task from './Task';
import ListPreview from './ListPreview';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import LoginView from './LoginView';
import ActiveList from './ActiveList';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
  }

  state = {
    newTodo: '',
    activeList: {},
  };

  renderTasks() {
    const { tasks } = this.props;

    const completeTasks = tasks.filter(task => task.checked);
    const incompleteTasks = tasks.filter(task => !task.checked);

    return [...incompleteTasks, ...completeTasks].map(task => {
      return <Task key={task._id} task={task} />;
    });
  }

  // HANDLERS
  handleChange = event => {
    this.setState({ newTodo: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    Meteor.call('tasks.insert', this.state.newTodo);

    // // Clear form
    this.setState({ newTodo: '' });
  };

  // ACTIONS
  createList = () => {
    Meteor.call('lists.insert', 'New List');
  };

  selectList = (e, listId) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ activeList: listId });
  };

  render() {
    console.log(this.props);
    return (
      <Fragment>
        <div className="app">
          {/* MAIN VIEW  */}
          {this.props.currentUser && (
            <Fragment>
              <header>
                <h1>Group Name ({this.props.incompleteCount})</h1>
                {/* <label className="hide-completed">
                  <input
                    type="checkbox"
                    readOnly
                    checked={this.state.hideCompleted}
                    onClick={this.toggleHideCompleted}
                  />
                  Hide Completed Tasks
                </label> */}
                <AccountsUIWrapper />
              </header>
              {/* <form className="new-task" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  ref="textInput"
                  placeholder="Type to add new tasks"
                  onChange={this.handleChange}
                  value={this.state.newTodo}
                />
              </form> */}
              <Grid className="list-container">
                {/* <ul>{this.renderTasks()}</ul> */}
                <Row>
                  {this.props.lists.map(list => (
                    <ListPreview
                      list={list}
                      selectList={this.selectList}
                      activeList={this.state.activeList}
                    />
                  ))}
                  {/* <Col xs={6}>
                  <button onClick={this.createList}>New List</button>
                  </Col> */}
                  <ListPreview createList={this.createList} />
                  <ActiveList selectList={this.selectList} list={this.state.activeList} />
                </Row>
              </Grid>
            </Fragment>
          )}
          {/* UNAUTHENTICATED VIEW */}
          <div />
        </div>
        {this.props.currentUser === null && <LoginView />}
      </Fragment>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  Meteor.subscribe('lists');
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
    lists: Lists.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
