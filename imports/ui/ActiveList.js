import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Lists } from '../api/lists.js';
import classnames from 'classnames';
import { Col } from 'react-flexbox-grid';

export default class Task extends Component {
  render() {
    // if a list is provided, render the preview
    const { list } = this.props;

    const closeIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
    )

    if (Object.keys(this.props.list).length) {
      return (
        <div className="ActiveList__wrapper">
          <div
            className="ActiveList__content"
            onClick={e => this.props.selectList(e, this.props.list)}
          >
            <div className="card-header">
              <div>{this.props.list.text}</div>
              <div role="button" tabIndex={0} className="close-icon" onClick={e => this.props.selectList(e, {})}>{closeIcon()}</div>
            </div>
            <div className="card-body">
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
