import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class Task extends Component {
  // toggleChecked() {
  //   // Set the checked property to the opposite of its current value
  //   Meteor.call(
  //     'tasks.setChecked',
  //     this.props.task._id,
  //     !this.props.task.checked
  //   );
  // }

  deleteThisTask = () => {
    // Meteor.call('tasks.remove', this.props.task._id);
  };

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    // const taskClassName = classnames({
    //   checked: this.props.task.checked,
    // });

    return (
      <div className="Task">
        {/* <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button> */}

        {/* <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        /> */}

        <div className="task-text">{this.props.task.text}</div>
        <div className="task-author">{this.props.task.author}</div>
      </div>
    );
  }
}
