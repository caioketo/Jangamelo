var util = require('util');
var Creature = require('./creature');
var formula = require('../../consts/formula');

var Player = function(opts) {
    Creature.call(this, opts);
    this.sessionId = opts.sessionId;
    
};

util.inherits(Player, Creature);

module.exports = Player;