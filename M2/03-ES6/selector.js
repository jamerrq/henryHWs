var traverseDomAndCollectElements = function (matchFunc, startEl, accum = []) {

    if (typeof startEl === "undefined") {
        startEl = document.body;
    }

    // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
    // usa matchFunc para identificar elementos que matchien

    // TU CÓDIGO AQUÍ
    if (!startEl) {
        return 0;
    }

    if (matchFunc(startEl)) {
        accum.push(startEl);
    }
    let children = startEl.childNodes;
    if (children) {
        for (let child of children) {
            if (child)
                traverseDomAndCollectElements(matchFunc, child, accum);
        }
    }
    return accum;
};

// Detecta y devuelve el tipo de selector devuelve uno de estos tipos: id,
// class, tag.class, tag


var selectorTypeMatcher = function (selector) {
    // tu código aquí
    let seps = selector.split(" ");
    if (seps.length > 1) return "several";
    if (selector[0] == "#") return "id";
    if (selector[0] == ".") return "class";
    if (/(.*)\.(.*)/.test(selector)) return "tag.class";
    return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH recuerda, la función matchFunction devuelta toma
// un elemento como un parametro y devuelve true/false dependiendo si el
// elemento matchea el selector.

var matchFunctionMaker = function (selector) {

    var selectorType = selectorTypeMatcher(selector);

    // Todas las funciones siguientes usan el concepto de closure

    // Esta función se encarga de los créditos extra
    if (selectorType === "several") {

        return (elem) => {
            let split = " ";
            if (selector.includes(">")) split = " > ";
            let order = selector.split(split).reverse();

            // Verifico que mi elemento actual cumpla la condición para proceder
            if (elem && elem.tagName
                && elem.tagName.toLowerCase() == order[0]) {

                // Caso >, ej p > body
                if (split == " > ") {

                    // En este caso, tengo que devolver true si los padres
                    // del elemento van matcheando el orden específico dado
                    // ejemplo, si mi selector es 'body > div > img', tengo
                    // que buscar un elemento de tipo img que tenga como
                    // padre un div que a su vez tenga como padre un body

                    // Voy recorriendo los padres (el padre del padre del ...)
                    for (let i = 1; i < order.length; ++i) {
                        // Obtengo el padre actual
                        let parent = elem.parentNode;
                        // Verifico que cumpla su condición correspondiente
                        if (!parent || !parent.tagName
                            || parent.tagName.toLowerCase() != order[i]) {
                            // En caso de que no exista el padre
                            // o no cumpla la condición, no tengo que buscar más
                            return false;
                        }
                        // Me paso al padre
                        elem = parent;
                    }

                    // Si llegó acá es porque cumplió todas las condiciones
                    return true;

                }

                // Caso espacio, ej 'body p'
                // En este caso, hay más flexibilidad, por lo que sólo tengo
                // que ir buscando en la familia de padres del nodo, si hay
                // padres que cumplan las condiciones
                // Ejemplo, si mi selector es body div img, tengo que consultar
                // si mi elemento es de tipo img y tiene algún padre de tipo
                // div que a su vez tenga algún padre de tipo body

                // Variable para ir recorriendo las tags a buscar en orden
                let j = 1;
                // Mientras no haya terminado de recorrer el orden
                // o aún tenga elementos para preguntar:
                while (j < order.length || !elem) {
                    // Obtengo el padre del nodo actual
                    let parent = elem.parentNode;
                    // Si no tengo nada para preguntar, salgo
                    if (!parent || !parent.tagName) break;
                    // Si conseguí un padre que cumple el orden actual, paso
                    // a la siguiente tag y sigo buscando
                    if (parent.tagName.toLowerCase() == order[j]) j++;
                    // Me paso al padre al final del ciclo
                    elem = parent;
                }
                // Si llegué al final del orden, es porque cumplí todos los
                // requisitos, en ese caso devuelvo true, en otro, false
                return j == order.length;
            }

            // Si mi elemento actual cumple la condición, devuelvo false
            return false;
        }
    }

    if (selectorType === "id") {
        return elem => {
            if (!elem) return false;
            return elem.id && elem.id == selector.slice(1);
        };
    } else if (selectorType === "class") {
        return elem => {
            if (!elem || !elem.getAttribute
                || !elem.getAttribute("class")) return false;
            let classes = elem.getAttribute("class").split(" ");
            return classes.includes(selector.slice(1));
        }
    } else if (selectorType === "tag") {
        return elem => {
            return elem.tagName &&
                elem.tagName.toLowerCase() == selector.toLowerCase();
        }
    } else {
        return elem => {
            [myTag, myClass] = selector.split(".");
            let f1 = matchFunctionMaker(myTag);
            let f2 = matchFunctionMaker("." + myClass);
            return f1(elem) && f2(elem);
        }
    }
};

var $ = function (selector) {
    var elements;
    var selectorMatchFunc = matchFunctionMaker(selector);
    elements = traverseDomAndCollectElements(selectorMatchFunc);
    return elements;
};
