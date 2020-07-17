import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections';

import './main.html';

Template.body.helpers({
/*   notes:[
    {text:'My Note 1'},
    {text:'My Note 2'},
    {text:'My Note 3'},
    {text:'My Note 4'}
  ] */
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

    // INsert node into collection
    Notes.insert({
      text,
      createdAt: new Date()
    });

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
    Notes.remove(this._id);
    return false;
  }
});