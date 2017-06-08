import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

Resol = new Mongo.Collection('resol');


Meteor.startup(() => {
  // code to run on server at startup
    console.log("Server Up and running");
});
Meteor.publish("resolutions",function(){
    return Resol.find({
        $or: [
            {private: {$ne: true} },
            {owner: this.userId}
        ]
    });
});

Meteor.methods({
  addResolution : function(Title){    
  Resol.insert({
            title: Title,
            createdAt: new Date(),
            owner: Meteor.userId()
        });  
      },
    DeleteResolution : function(id) {
        var res = Resol.findOne(id);
        if(res.owner !== Meteor.userId())
            {
                throw new Meteor.Error('Not-authorized');
            }
        else{
         Resol.remove(id);
            }
    },
    updateResolution : function(id,check) {
        var res = Resol.findOne(id);
        if(res.owner !== Meteor.userId())
            {
                throw new Meteor.Error('Not-authorized');
            }
        else{
        Resol.update(id, {$set: {checked : check}});  
            }
    },
    SetPrivate : function(id,private) {
        var res = Resol.findOne(id);
        if(res.owner !== Meteor.userId())
            {
                throw new Meteor.Error('Not-authorized');
            }
        Resol.update(id, {$set: {private : private}}); 
        
    }
});