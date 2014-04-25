var util = require('util');
var Entity = require('./entity');
var formula = require('../../consts/formula');


var Creature = function(opts) {
  Entity.call(this, opts);
  
  this.orientation = opts.orientation;
  this.target = null;
  this.attackers = {};
  this.died = false;
  this.hp = opts.hp;
  this.mp = opts.mp;
  this.level = opts.level;
  this.experience = opts.experience;
  this.stats = {
      str: opts.str,
      dex: opts.dex,
      con: opts.con,
      int: opts.int,
      wis: opts.wis,
      cha: opts.cha
  };
  this.isMoving = false;
  this.buffs = [];
  this.skills = [];
  this.talents = [];
  this.spells = [];
};

util.inherits(Creature, Entity);

module.exports = Creature;

Creature.prototype.setTarget = function(targetId) {
    this.target = targetId;
};

Creature.prototype.hasTarget = function() {
    return !!this.target;
};

Creature.prototype.clearTarget = function() {
    this.target = null;
};

Creature.prototype.resetHp = function() {
    this.hp = formula.calcMaxHP(this);
};

Creature.prototype.recoverHp = function(hpValue) {
    if(this.hp >= formula.calcMaxHP(this)) {
        return;
    }

    var hp = this.hp + hpValue;
    if(hp > formula.calcMaxHP(this)) {
        this.hp = formula.calcMaxHP(this);
    } else {
        this.hp = hp;
    }
};

Creature.prototype.resetMp = function() {
    this.mp = formula.calcMaxMP(this);
};

Creature.prototype.recoverMp = function(mpValue) {
    if(this.mp >= formula.calcMaxMP(this)) {
        return;
    }

    var mp = this.mp + mpValue;
    if(mp > formula.calcMaxMP(this)) {
        this.mp = formula.calcMaxMP(this);
    } else {
        this.mp = mp;
    }
};

Creature.prototype.reduceHp = function(damageValue) {
    this.hp -= damageValue;
    if (this.hp <= 0) {
        this.died = true;
        this.afterDied();
    }
};

Creature.prototype.reduceMp = function(mp) {
    this.mp -= mp;
    if (this.mp <= 0) {
        this.mp = 0;
    }
};

