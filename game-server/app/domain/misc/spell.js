var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Spell = function (opts) {
    EventEmitter.call(this);
    this.id = opts.id;
    this.name = opts.name;
    var reqScript = require('../scripts/spells/' + opts.script);
    this.script = new reqScript({
        scriptName: opts.scriptName
    });
};

util.inherits(Spell, EventEmitter);

module.exports = Spell;

var create = function (opts) {
    var spell = new Spell(opts);
    spell.level = opts.level;
};

module.exports.create = create;