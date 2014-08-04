/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Item = require('../../app/models/item');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var ipod, couch, table;

describe('Item', function(){
  before(function(done){
    dbConnect('commerce-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Item.collection.remove(function(){
      ipod = new Item ({name:'iPod', dimensions:{length:'3', width:'5', height:'10'}, weight:'0.3', color:'purple', quantity:'12', msrp:'100', percentOff:'20'});
      couch = new Item ({name:'couch', dimensions:{length:'3', width:'5', height:'10'}, weight:'0.3', color:'purple', quantity:'12', msrp:'100', percentOff:'20'});
      table = new Item ({name:'table', dimensions:{length:'3', width:'5', height:'10'}, weight:'0.3', color:'purple', quantity:'12', msrp:'100', percentOff:'20'});
      ipod.save(function(){
        couch.save(function(){
          table.save(function(){
          done();
          });
       });
    });
  });
  });


  describe('constructor', function(){
    it('should create a new Item object', function(){
      var item = new Item ({name:'iPod', dimensions:{length:'3', width:'5', height:'10'}, weight:'0.3', color:'purple', quantity:'12', msrp:'49.99', percentOff:'20'});

      expect(item).to.be.instanceof(Item);
      expect(item.name).to.equal('iPod');
      expect(item.dimensions.length).to.equal(3);
      expect(item.dimensions.width).to.equal(5);
      expect(item.dimensions.height).to.equal(10);
      expect(item.weight).to.be.closeTo(0.3, 0.1);
      expect(item.color).to.equal('purple');
      expect(item.quantity).to.equal(12);
      expect(item.msrp).to.equal(49.99);
      expect(item.percentOff).to.equal(20);
    });
  });

  describe('#cost', function(){
   it('should calcualate the cost of an item', function(){
     var ipod = new Item ({name:'iPod', dimensions:{length:'3', width:'5', height:'10'}, weight:'0.3', color:'purple', quantity:'12', msrp:'100', percentOff:'20'});
     expect(ipod.cost()).to.be.closeTo(80, 0.1);
     });
  });

  describe('#save', function(){
    it('should insert a new iPod into the database', function(done){
      var ipod = new Item ({name:'iPod', dimensions:{length:'3', width:'5', height:'10'}, weight:'0.3', color:'purple', quantity:'12', msrp:'100', percentOff:'20'});
      ipod.save(function(){
        expect(ipod._id).to.be.instanceof(Mongo.ObjectID);
        done();
    });
  });
  });

  describe('.findById', function(){
     it('should find an item by id',function(done){
        Item.find({},function(items){  
           // console.log(items);
           Item.findById(ipod._id.toString(), function(item){
             console.log(item.name);
             expect(item.name).to.equal('iPod');
             done();
            });
          });
        });
    });

 describe('.deleteById', function(){
   it('should remove an Item in database by id', function(done){
     Item.find({}, function(items){
       Item.deleteById(ipod._id.toString(), function(){
         Item.all( function(items2){
           expect(items2).to.have.length(2);
           done();
           });
        });
      });
    });
   });
});
