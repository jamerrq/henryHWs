const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Role', {
        name: {
            // Tipo String
            type: DataTypes.STRING,
            // Debe ser único
            unique: true,
            // No puede ser nulo
            allowNull: false,
        },
        description: {
            // Tipo String
            type: DataTypes.STRING,
        },
    });
};
