/* jshint expr:true */
/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Item = require('../../app/models/item');

describe('Item', function(){
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
     expect(ipod.cost()).to.equal(80);
     });
  });
});
