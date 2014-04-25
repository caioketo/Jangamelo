var EventEmitter = require('events').EventEmitter;
var util = require('util');

var id = 1;

var Entity = function(opts) {
    EventEmitter.call(this);
    this.entityId = id++;
    this.name = opts.name;
    this.position = {
        x: opts.x,
        y: opts.y,
        z: opts.z
    };
    this.area = opts.area;
};

util.inherits(Entity, EventEmitter);

module.exports = Entity;

Entity.prototype.getEId = function () {
    return this.entityId;
};

Entity.prototype.getPos = function () {
    return this.position;
};

Entity.prototype.setPos = function (pos) {
    this.position = pos;
};

Entity.prototype.setX = function (x) {
    this.position.x = x;
};

Entity.prototype.setY = function (y) {
    this.position.y = y;
};

Entity.prototype.setZ = function (z) {
    this.position.z = z;
};




