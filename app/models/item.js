'use strict';

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


  module.exports = Item;
