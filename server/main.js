import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

Resol = new Mongo.Collection('resol');


Meteor.startup(() => {
  // code to run on server at startup
    console.log("Server Up and running");
});

Meteor.methods({
  addResolution : function(Title){    
  Resol.insert({
            title: Title,
            createdAt: new Date()
        });  
      } 
});