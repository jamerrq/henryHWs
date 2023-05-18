/* ¡Escribe tus comandos en este archivo! */

const ejercicio02 = 'SELECT title from movies WHERE duration < 90;';

const ejercicio03 = 'SELECT title from movies WHERE year >= 1930 and year <= 1940;';

const ejercicio04 = 'SELECT title from movies WHERE title LIKE \'%til%\';';

const ejercicio05 = 'SELECT title from movies WHERE ARRAY_LENGTH(actors, 1) = 1;';

const ejercicio06 = 'SELECT title, AVG(rating) FROM movies, unnest(ratings) rating GROUP BY title;';

const ejercicio07 = 'SELECT actors FROM movies WHERE title LIKE \'% Fast and%\' AND year=2016;';

module.exports = {
    ejercicio02,
    ejercicio03,
    ejercicio04,
    ejercicio05,
    ejercicio06,
    ejercicio07,
};
