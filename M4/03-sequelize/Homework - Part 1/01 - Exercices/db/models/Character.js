const { DataTypes, Sequelize } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Character', {
        code: {
            // Tipo String
            type: DataTypes.STRING,
            // Primary key
            primaryKey: true,
            // 5 caracteres máximo
            // Armar un custom validator
            // para validar que el código no sea "HENRY"
            // incluyendo cualquier variación de mayúsculas y minúsculas
            validate: {
                isNotHenry(value) {
                    // console.log(value);
                    if (value.toUpperCase() === 'HENRY') {
                        throw new Error('No puede ser Henry');
                    }
                },
                len: [0, 5],
            },
        },
        name: {
            // Tipo String
            type: DataTypes.STRING,
            // Debe ser único
            unique: true,
            // No puede ser nulo
            allowNull: false,
            // El valor no puede ser "Henry" o "SoyHenry" o "Soy Henry"
            validate: {
                notIn: [['Henry', 'SoyHenry', 'Soy Henry']],
            },
        },
        age: {
            // Tipo Integer
            type: DataTypes.INTEGER,
        },
        race: {
            // Enum ('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other')
            type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
            // Por default, 'Other'
            defaultValue: 'Other',
        },
        hp: {
            // Tipo Float
            type: DataTypes.FLOAT,
            // No puede ser nulo
            allowNull: false,
        },
        mana: {
            // Tipo Float
            type: DataTypes.FLOAT,
            // No puede ser nulo
            allowNull: false,
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
};
