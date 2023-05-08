const { filter } = require("bluebird");
const express = require("express");

let publications = [];

const server = express();
server.use(express.json());


// EJERCICIO 1
// Ruta tipo POST
let id = 1;
server.post("/posts", (req, res) => {
    // Verificamos si existen los parámetros en el body
    const { author, title, contents } = req.body;
    console.log(author, title, contents);

    // En caso de que no exista ninguno de estos parámetros, devuelve un error
    if (!author || !title || !contents) {
        let json = {
            "error": "No se recibieron los parámetros necesarios para crear la publicación",
        };
        res.status(400).json(json);
    }

    // En caso de que existan, crea una nueva publicación
    else {
        let post = {
            author,
            title,
            contents,
            id: id++,
        };
        // Se agrega la nueva publicación al array publications
        publications.push(post);
        res.status(200).json(post);
    };
});


// EJERCICIO 2
// Ruta tipo GET con querys author y title
server.get("/posts", (req, res) => {
    const { author, title } = req.query;
    // console.log(author, title);

    // Verificar si existen las querys author y title
    let filteredPosts;
    if (author && title) {
        filteredPosts = publications.filter(
            (post) => post.author === author && post.title === title
        );
    };

    // Si existen, devuelve un json con las publicaciones que coincidan con ambas querys
    if (filteredPosts?.length) {
        // console.log(filteredPosts);
        res.status(200).json(filteredPosts);
    }

    // Si no existen, devuelve un error
    else {
        res.status(400).json({
            "error": "No existe ninguna publicación con dicho título y autor indicado"
        });
    };
});


// EJERCICIO 3
// Ruta tipo GET con query author
server.get("/posts/:author", (req, res) => {
    const { author } = req.params;
    // console.log(author);

    // Verificamos si existe alguna publicación del autor indicado
    let filteredPosts;
    if (author) {
        filteredPosts = publications.filter(
            (post) => post.author === author
        );
    };

    // Si existe, devuelve un json con las publicaciones del autor indicado
    if (filteredPosts?.length) {
        // console.log(filteredPosts);
        res.status(200).json(filteredPosts);
    }

    // Si no existe, devuelve un error
    else {
        res.status(400).json({
            "error": "No existe ninguna publicación del autor indicado"
        });
    };

});


// EJERCICIO 4
// Ruta tipo PUT con query id
server.put("/posts/:id", (req, res) => {

    // Revisar si existe el id
    const { id } = req.params;
    // console.log(id);

    // Revisar si existen los parámetros en el body
    const { title, contents } = req.body;
    // console.log(title, contents);

    // En caso de que no exista ninguno de estos parámetros, devuelve un error
    if (!title || !contents) {
        res.status(400).json({
            "error": "No se recibieron los parámetros necesarios para modificar la publicación"
        });
    } else {
        // En caso de que existan pero el id no corresponda a ninguna
        // publicación, devuelve un error
        let post = publications.find((post) => post.id === parseInt(id));
        if (!post) {
            res.status(400).json({
                "error": "No se recibió el id correcto necesario para modificar la publicación"
            });
        } else {
            // En caso de que existan y el id corresponda a una publicación
            // se modifica la publicación
            post.title = title;
            post.contents = contents;
            res.status(200).json(post);
        }
    };
});


// EJERCICIO 5
// Ruta tipo DELETE con query id
server.delete("/posts/:id", (req, res) => {
    // Asegurarse que se recibe el id
    const { id } = req.params;
    // console.log(id);
    // En caso de que no exista el id, devuelve un error
    if (!id) {
        res.status(400).json({
            "error": "No se recibió el id de la publicación a eliminar"
        });
    } else {
        // En caso que el id corresponda a una publicación, se elimina
        // y se devuelve un JSON
        let post = publications.find((post) => post.id === parseInt(id));
        if (!post) {
            res.status(400).json({
                "error": "No se recibió el id correcto necesario para eliminar la publicación"
            });
        } else {
            publications = publications.filter((post) => post.id !== parseInt(id));
            res.status(200).json({
                "success": true
            });
        }
    }
});


// NO MODIFICAR EL CODIGO DE ABAJO.
// SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
