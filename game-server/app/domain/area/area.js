
var Area = function (opts) {
    this.vertices = opts.vertices || [];
    this.id = opts.id || -1;
    this.players = [];
    this.creatures = [];
};