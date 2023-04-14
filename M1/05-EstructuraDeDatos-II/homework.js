'use strict';

const { has } = require("markdown-it/lib/common/utils");

/**
 * Solución Tarea # 05 Módulo 1 Henry
 * Autor: Jamer José Rebolledo Quiroz
 * Github: https://github.com/jamerrq
 * Linkedin: https://linkedin.com/in/jamerrq
 */

/* EJERCICIO 1
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor (tener en cuenta el caso particular de una lista de un solo nodo y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true.
  EJEMPLO
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

class LinkedList {

    constructor(){
        // Inicializo mi Linked List con una cabeza vacía, y guardo esa
        // referencia como una propiedad del objeto mismo
        this.head = null;
        // Inicializo una propiedad tamaño en 0
        this.size = 0;
    }

    add(data){
        // Creo un nuevo nodo con la data pasada
        let node = new Node(data);
        // Uso un objeto temporal para ir recorriendo mi lista
        // empiezo en la cabeza
        let temp = this.head;

        // Si no hay cabeza, directamente asignarla a mi nuevo nodo
        if(!temp){
            this.head = node;
        }
        // Si hay cabeza, vamos a ir recorriendo los nodos hasta llegar al final
        // (el que no tiene nodo siguiente), cuando lo tengamos, le asignamos
        // nuestro nodo creado como su nodo siguiente
        else{
            while(temp.next)temp = temp.next;
            temp.next = node;
        }
        // Aumentamos el tamaño de la lista en 1
        this.size++;
    }

    remove(){

        // Caso que no exista ningún nodo en la lista
        if(!this.size) return null;

        // Para los demás casos, usaremos una variable temporal para recorrer
        // la lista, también una variable last para almacenar el valor a remover
        let temp = this.head;
        let last = null;

        // Caso que sólo exista la cabeza
        if(this.size == 1){
            // Almacenamos el valor de la cabeza en una variable temporal
            // porque luego retornaremos este valor
            last = temp.value;
            // Reasignamos la propiedad cabeza como null, esto es equivalente
            // a resetear esta propiedad de fábrica.
            this.head = null;
        }

        // Caso que exista la cabeza y hayan más nodos conectados
        else{
            // Llegamos al penúltimo nodo
            for(let i = 0; i < this.size - 2; ++i)temp = temp.next;
            // Guardamos el valor del último nodo en una variable
            last = temp.next.value;
            // Se desconecta el último nodo del penúltimo, esto es equivalente
            // a remover el nodo de la lista
            temp.next = null;
        }

        // Reducimos el valor en 1
        this.size--;
        // Devolvemos el valor almacenado antes
        return last;
    }

    search(param){
        // Uso una variable temporal para recorrer mi lista
        let temp = this.head;
        // Si no existe la cabeza, retorno null
        if(!temp)return null;

        // Voy recorriendo mi lista y preguntando
        while(temp){

            // Si el tipo de parámetro pasado, no es una función, pregunto si
            // el valor de mi nodo actual coinicide con el parámetro pasado
            if(typeof param != "function"){
                // En caso que sí, retorno ese valor
                if(temp.value === param)return temp.value;
            }

            // En caso que el tipo de parámetro pasado, si sea una función,
            // evaluo el retorno de esa función cuando la invoco con el valor
            // de mi nodo actual
            else{
                // En caso que la función me retorne true, devuelvo
                // el valor encontrado
                if(param(temp.value))return temp.value;
            }

            // Paso al siguiente nodo
            temp = temp.next;
        }

        // Si no encontré nada:
        return null;
    }

}

class Node {

    constructor(value){
        this.value = value;
        this.next  = null;
    }

}

/* EJERCICIO 2
Implementar la clase HashTable.
Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests, a modo de ejercicio adicional, pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético, suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) y calcula el módulo de ese número total por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash, y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, con hasKey, si ya hay algo en la tabla con el nombre 'instructora'; luego, invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico (determinado al hashear la clave)
*/

class HashTable {

    constructor(numBuckets=35){
        // Se usa como valor por defecto 35, esto permite crear instancias
        // con un número diferente de buckets
        this.numBuckets = numBuckets;
        // Inicializo mis buckets
        this.buckets = Array.from(Array(numBuckets), () => {
            return {};
        });
    }

    hash(str){
        // Coloco la excepción acá porque todos los demás métodos usan este
        if(typeof str != "string")throw new TypeError("Keys must be strings");
        // Suma de todos los caracteres usando la función reduce
        let suma = str.split("").reduce((acc, value) => {
            return acc + value.charCodeAt(0);
        }, 0);
        // Obtengo la posición correspondiente en el arreglo interno
        let index = suma % this.numBuckets;
        // Retorno el índice hasheado
        return index;
    }

    set(key, value){
        // Calculo el índice correspondiente para la clave pasada
        let index = this.hash(key);
        // Obtengo el bucket correspondiente (objeto)
        let bucket = this.buckets[index];
        // Almaceno mi valor en el bucket correspondiente creando una propiedad
        // en el bucket con el nombre de mi clave
        bucket[key] = value;
    }

    get(key){
        // Calculo el índie correspondiente para la clave pasada
        let index = this.hash(key);
        // Obtengo el bucket correspondiente (objeto)
        let bucket = this.buckets[index];
        // Accedo al contenido del bucket en la clave correspondiente
        return bucket[key];
    }

    hasKey(key){
        // Calculo el índice correspondiente para la clave pasada
        let index = this.hash(key);
        // Obtengo el bucket correspondiente
        let bucket = this.buckets[index];
        // Devuelvo el resultado directo de preguntar si el bucket tiene
        // la propiedad correspondiente almacenada
        return bucket.hasOwnProperty(key);
    }
}

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
    Node,
    LinkedList,
    HashTable,
};
