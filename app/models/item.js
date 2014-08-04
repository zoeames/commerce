'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

function Item(body){
  //console.log(body);
  this.name =body.name;
  this.dimensions={};
  this.dimensions.length = body.dimensions.length*1;
  this.dimensions.width = body.dimensions.width*1;
  this.dimensions.height = body.dimensions.height*1;
  this.weight =parseFloat(body.weight);
  this.color =body.color;
  this.quantity =parseInt(body.quantity);
  this.msrp =parseFloat(body.msrp);
  this.percentOff =parseInt(body.percentOff);
}

Object.defineProperty(Item, 'collection', {
    get: function(){return global.mongodb.collection('items');}
});



Item.prototype.cost = function(){
    return (this.msrp - ((this.percentOff / 100) * this.msrp));
};

Item.prototype.save = function(cb){
  Item.collection.save(this, cb);
};

Item.find = function(query, cb){
  Item.collection.find(query).toArray(function(err, items){
    for(var i = 0; i < items.length; i++){items[i] = changePrototype(items[i]);}
    //console.log(items);
    cb(err, items);
  });
};

Item.all = function(cb){
  Item.collection.find().toArray(function(err, objects){
    var items = objects.map(function(o){
      return changePrototype(o);
    });

    cb(items);
  });
};

Item.findById = function(id, cb){
  console.log(id);
  var _id = Mongo.ObjectID(id);
  //id = (typeof id === 'string') ? Mongo.ObjectID(id) : id;
  Item.collection.findOne({_id:_id}, function(err, obj){
    var itm = changePrototype(obj);
    cb(itm);
  });
};

Item.deleteById = function(id, cb){
  id = (typeof id === 'string') ? Mongo.ObjectID(id) : id;
  Item.collection.findAndRemove({_id:id}, cb);
};



  module.exports = Item;

// PRIVATE FUNCTIONS ///

function changePrototype(obj){
  var item = _.create(Item.prototype, obj);

  return item;
}

