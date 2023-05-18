-- # Ejercicio 2
SELECT title from movies WHERE duration < 90;

-- # Ejercicio 3
SELECT title from movies WHERE year >= 1930 and year <= 1940;

-- # Ejercicio 4
SELECT title from movies WHERE title LIKE '%til%';

-- # Ejercicio 5
SELECT title from movies WHERE ARRAY_LENGTH(actors, 1) = 1;

-- # Ejercicio 6
SELECT title, AVG(rating) FROM movies, unnest(ratings) rating GROUP BY title;

-- # Ejercicio 7
SELECT actors FROM movies WHERE title LIKE '% Fast and%' AND year=2016;
