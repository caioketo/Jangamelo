var Script = function (opts) {
    this.name = opts.scriptName;
};

Script.prototype.call = function() {
    console.log('Called script');
};

module.exports = Script;