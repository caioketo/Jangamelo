var Entity = require('../domain/entity/entity');
var Creature = require('../../app/domain/entity/creature');
var Spell = require('../../app/domain/misc/spell'); 

var entity = new Entity({
	id: 1,
	name: 'x',
	x: 1,
	y: 2,
	z: 1
});

console.log('entity is : ' + JSON.stringify(entity));

var creature = new Creature({
	id:1,
	name: 'kk',
	x: 2,
	y: 3,
	characterId: 2,
	characterName: 'xcc'
});

console.log('creature is : ' + JSON.stringify(creature));

var spell = new Spell({
    id:1,
    name: 'teste',
    script: 'teste',
    scriptName: 'fireball'
});

console.log('spell is : ' + JSON.stringify(spell));
console.log('spellscript is : ' + JSON.stringify(spell.script));
spell.script.call();

