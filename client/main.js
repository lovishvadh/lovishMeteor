import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
Resol = new Mongo.Collection('resol');


Meteor.subscribe("resolutions");

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

Template.resolution.helpers({
    isOwner : function() {
        return this.owner === Meteor.userId();
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
      Meteor.call("updateResolution",this._id,!this.checked);
    },
    'click .delete' : function() {
       Meteor.call("DeleteResolution",this._id);
    },
    'click .toggle-private' : function() {
        Meteor.call("SetPrivate",this._id,!this.private);
    }
    
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
})