import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Lists = new Mongo.Collection('lists');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('lists', function listsPublication() {
    return Lists.find({ owner: this.userId });
  });
}

Meteor.methods({
  'lists.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Lists.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      tasks: [],
    });
  },

  'lists.remove'(listId) {
    check(listId, String);

    const list = Lists.findOne(listId);
    if (list.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Lists.remove(listId);
  },

  'lists.setChecked'(listId, setChecked) {
    check(listId, String);
    check(setChecked, Boolean);

    const list = Lists.findOne(listId);
    if (list.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Lists.update(listId, { $set: { checked: setChecked } });
  },

  'lists.addTask'(listId, updatedTasks) {
    check(listId, String);
    check(updatedTasks, Array);

    const list = Lists.findOne(listId);

    // check if list is owned by person trying to edit
    if (list.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Lists.update(listId, { $set: { tasks: updatedTasks } });
  },
});
