const { DataTypes } = require('sequelize');


module.exports = sequelize => {
    sequelize.define('Ability', {
        name: {
            // Tipo String
            type: DataTypes.STRING,
            // No puede ser nulo
            allowNull: false,
        },
        description: {
            // Tipo String
            type: DataTypes.STRING,
        },
        mana_cost: {
            // Tipo Float
            type: DataTypes.FLOAT,
            // No puede ser nulo
            allowNull: false,
            // El valor debe estar entre 10 y 250
            validate: {
                min: 10,
                max: 250,
            },
        },
    },
        {
            // La combinación de nombre y mana_cost debe ser única
            indexes: [
                {
                    unique: true,
                    fields: ['name', 'mana_cost']
                },
            ],
        });
};
