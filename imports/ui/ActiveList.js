import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { Lists } from '../api/lists.js';
import classnames from 'classnames';
import { Col } from 'react-flexbox-grid';

import Task from './Task';

export default class ActiveList extends Component {
  state = {
    newTask: '',
  };

  addNewTask = e => {
    e.preventDefault();

    const { newTask } = this.state;
    const { currentUser } = this.props;
    const { _id, tasks } = this.props.list;

    tasks.push({
      text: newTask,
      complete: false,
      author: currentUser.username,
    });

    console.log(tasks);

    Meteor.call('lists.addTask', _id, tasks);
  };

  render() {
    // if a list is provided, render the preview
    const { list } = this.props;

    const closeIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
        <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
      </svg>
    );

    return (
      <Fragment>
        {Object.keys(this.props.list).length > 0 && (
          <div className="ActiveList__wrapper">
            <div
              className="ActiveList__content"
              // onClick={e => this.props.selectList(e, this.props.list)}
            >
              <div className="card-header">
                <div className="list-title">{this.props.list.text}</div>
                <div
                  role="button"
                  tabIndex={0}
                  className="close-icon"
                  onClick={e => this.props.selectList(e, {})}
                >
                  {closeIcon()}
                </div>
              </div>
              <div className="new-task-row">
                <form
                  className="new-task-form"
                  onSubmit={e => this.addNewTask(e)}
                >
                  <input
                    className="new-task-input"
                    type="text"
                    value={this.state.newTask}
                    onChange={e => {
                      this.setState({ newTask: e.target.value });
                    }}
                  />
                  <input className="submit-button" type="submit" value="Add" />
                </form>
              </div>
              <div className="card-body">
                {this.props.list.tasks.map(task => (
                  <Task task={task} />
                ))}
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
