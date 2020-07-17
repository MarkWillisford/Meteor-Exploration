import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections';
import { Accounts } from 'meteor/accounts-base';

// Accounts config
Accounts.ui.config({
  passwordSignupFields:"USERNAME_ONLY"
});

import './main.html';

Template.body.helpers({
  notes(){
    return Notes.find({});
  }
});

Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();

    // Get input value
    const target = event.target;
    const text = target.text.value;

    Meteor.call('notes.insert', text);

    // clear form
    target.text.value = '';

    // Close modal
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    
    return false;
  }
});

Template.note.events({
  'click .delete-note': function(){
    Meteor.call('notes.remove', this);
    return false;
  }
});