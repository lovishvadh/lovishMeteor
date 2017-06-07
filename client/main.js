import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
Resol = new Mongo.Collection('resol');




Template.body.helpers({
   resolutions : function(){
       if(Session.get('hideFinished')) {
           return Resol.find({checked: {$ne : true}});
       }else{
           return Resol.find();
       }
       
   },
    hideFinished : function() {
        return Session.get('hideFinished');
    }
});

Template.body.events({
    'submit .new-resolution' : (event) => {
        var Title = event.target.title.value;
       Meteor.call("addResolution",Title);
        event.target.title.value="";
   return false;
    },
    'change .hide-finished' : function() {
        Session.set('hideFinished',event.target.checked);
    }
});

Template.resolution.events({
    
    'click .toggle-checked' : function() {
      Resol.update(this._id, {$set: {checked : !this.checked}});  
    },
    'click .delete' : function() {
        Resol.remove(this._id);
    }
    
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
})