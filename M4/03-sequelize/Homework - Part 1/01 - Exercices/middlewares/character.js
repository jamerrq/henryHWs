const { Router } = require("express");
const { Op, Character, Role } = require("../db");


const router = Router();


// Esta ruta debe recibir por body los datos del modelo de Character y crear
// una instancia del mismo en la base de datos
router.post("/", async (req, res) => {
    // console.log(`req.body: ${req.body}`);
    const { code, name, age, race, hp, mana } = req.body;
    if (!code || !name || !age || !race || !hp || !mana) {
        // console.log(code, name, age, race, hp, mana);
        return res.status(404).send("Falta enviar datos obligatorios");
    };
    // Si alguna validación falla, debería devolver un status 404 con el mensaje
    // "Error en alguno de los datos provistos".
    try {
        // Si todos los datos son provistos, debe devolver un status 201 y el
        // objeto del personaje
        const newCharacter = await Character.create({
            code,
            name,
            age,
            race,
            hp,
            mana,
        });
        return res.status(201).send(newCharacter);
    } catch (error) {
        // console.log(error);
        // De no recibir todos los parámetros necesarios, debería devolver un status
        // 404 con el mensaje "Falta enviar datos obligatorios"
        // console.log(error);
        return res.status(404).send("Error en alguno de los datos provistos");
    };
});


// Esta ruta debe retornar todos los personajes que se encuentran creados en la
// base de datos. Además, este endpoint debe aceptar por query un valor de una
// raza para filtrar los resultados, por ejemplo: GET /character?race=human
router.get("/", async (req, res) => {
    try {
        // Vamos a agregarle a nuestra ruta la posibilidad de que pueda recibir
        // un age por query, de manera que se puedan combinar ambos filtros, el
        // que ya estaba (race) y el que acabamos de crear (age).

        // Obtenemos el valor de la query
        let query = req.query;
        // console.log("QUERY:", query, !query);
        // Si no hay query, devolvemos todos los personajes
        if (!query.race && !query.age) {
            // console.log("No hay query");
            const characters = await Character.findAll();
            return res.status(200).send(characters);
        };
        // Si hay query, filtramos por raza y edad
        let { race, age } = query;
        // console.log("Race:", race);
        // console.log("Age:", age);
        // Filtrar por raza
        let characters = race ? await Character.findAll({
            where: {
                race,
            },
        }) : await Character.findAll();
        // Filtrar por edad
        characters = age ? characters.filter((character) => character.age === +age) : characters;
        // Devolver los personajes filtrados
        return res.status(200).send(characters);
    } catch (error) {
        // console.log(error);
        return res.status(404).send("No se encontraron personajes");
    };
});


// Get /character/:code
// Esta ruta debe retornar aquel personaje que coincida con el code recibido por params
router.get("/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const character = await Character.findOne({
            where: {
                code,
            },
        });
        if (!character) {
            return res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
        }
        return res.status(200).send(character);
    } catch (error) {
        return;
    };
});


// Put /character/:attribute?value=...
// Vamos a crear un PUT el cual va a recibir un atributo como param y un value
// por query.
router.put("/:attribute", async (req, res) => {
    try {
        // Deberá modificar todos los valores de dicho atributo con el valor
        // dado por todas las instancias de personajes que existan en la base
        // de datos y cuyo valor de ese atributo sea null, es decir, si se hace
        // un request PUT a /character/age?value=40, deberá buscar todos los
        // personajes que tengan el valor de age en null y modificarlos a 40.
        const { attribute } = req.params;
        const { value } = req.query;
        const characters = await Character.update({
            [attribute]: value,
        }, {
            where: {
                [attribute]: null,
            },
        });
        // Debe devolver simplemente un mensaje que diga 'Personajes actualizados'
        return res.status(200).send("Personajes actualizados");
    } catch (error) {
        return res.status(404).send("No se encontraron personajes con ese atributo");
    };
});


module.exports = router;
