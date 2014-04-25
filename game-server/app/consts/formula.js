var formula = module.exports;

formula.sample = function() {
    console.log('sample formula');
};

formula.calcMaxHP = function (creature) {
    return (creature.stats.con * 20) + 100;
};

formula.calcMaxMP = function (creature) {
    return (creature.stats.wis * 10) + 50;
};