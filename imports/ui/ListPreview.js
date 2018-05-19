import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Lists } from '../api/lists.js';
import classnames from 'classnames';
import { Col } from 'react-flexbox-grid';

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

  // deleteThisTask() {
  //   Meteor.call('tasks.remove', this.props.task._id);
  // }

  render() {
    // if a list is provided, render the preview
    const { list, activeList } = this.props;
    const listActive = list && (activeList === list._id) ? 'active' : ''
    return (
      <Col xs={6} md={4} lg={3} className={`box ${listActive}`}>
        {this.props.list && (
          <div className="ListPreview" onClick={() => this.props.selectList(this.props.list._id)}>
            <div className="text">
              <strong>{this.props.list.text}</strong>
            </div>
          </div>
        )}
        {!this.props.list && (
          <div className="ListPreview" onClick={() => this.props.createList()}>
            <div className="ListPreview__create">
              <div className="ListPreview__create-text">Create New List</div>
              <div className="ListPreview__plus">+</div>
            </div>
          </div>
        )}
      </Col>
    );
  }
}
