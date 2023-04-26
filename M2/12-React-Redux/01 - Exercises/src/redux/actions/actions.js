import axios from "axios";
import { ADD_PRODUCT, DELETE_PRODUCT, GET_STORE_NAME } from "./types";
import 'axios';


export function addProduct(product) {
    return {
        type: ADD_PRODUCT,
        payload: product
    }
}

export function deleteProduct(id) {
    return {
        type: DELETE_PRODUCT,
        payload: id,
    }
}

export function getStoreName() {

    return async function (dispatch) {
        let response = await axios.get('http://localhost:3001/store');
        let { data } = response;
        return dispatch({
            type: GET_STORE_NAME,
            payload: data.name,
        });
    }

}
