const { Sequelize, Op } = require('sequelize');
const modelCharacter = require('./models/Character.js');
const modelAbility = require('./models/Ability.js');
const modelRole = require('./models/Role.js');

const db = new Sequelize(
    'postgres://jamerrq:oriSHas@localhost:5432/henrydatabase',
    {
        logging: false,
    },
);

modelCharacter(db);
modelAbility(db);
modelRole(db);

// Relaciones
const { Character, Ability, Role } = db.models;

// Ahora si debes usar los métodos hasOne, belongsTo, hasMany o belongsToMany
// según corresponda:
// - Un personaje tiene una habilidad y una habilidad pertenece a un personaje
// - Un personaje tiene un rol y un rol pertenece a un personaje
// - Un personaje puede tener muchas habilidades y una habilidad puede pertenecer
// a muchos personajes
// - Un personaje puede tener muchos roles y un rol puede pertenecer a muchos
// personajes
Character.hasOne(Ability);
Ability.belongsTo(Character);
Character.hasOne(Role);
Role.belongsTo(Character);
Character.belongsToMany(Ability, { through: "character_ability" });
Ability.belongsToMany(Character, { through: "character_ability" });
Character.belongsToMany(Role, { through: "character_role" });
Role.belongsToMany(Character, { through: "character_role" });

module.exports = {
    ...db.models,
    db,
    Op,
};
