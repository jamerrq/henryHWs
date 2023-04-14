/**
 * Solución Tarea # 04 Módulo 2 Henry Full Stack Course FT
 *    AUTOR: Jamer José Rebolledo Quiroz
 *   GitHub: https://github.com/jamerrq
 * Linkedin: https://linkedin.com/in/jamerrq
 */

const usersListRequest = () => {
    let [friendsList] = $('#lista');
    const callback = (response) => {
        while (friendsList.firstChild) {
            friendsList.removeChild(friendsList.firstChild);
        }
        for (let friend of response) {
            let li = document.createElement("li");
            li.innerHTML = `${friend.id} ${friend.name}`;
            li.id = friend.id;
            friendsList.appendChild(li);
        }
    }
    $.get('http://localhost:5000/amigos', callback);
};

const showFriendRequest = () => {
    let [spanElement] = $('#amigo');
    let [inputElement] = $('#input');
    let index = inputElement.value;
    if (!index) return;
    const callback = (response) => {
        spanElement.innerHTML = response.name;
    }
    let url = `http://localhost:5000/amigos/` + String(index);
    $.get(url, callback);
}

const deleteFriendRequest = () => {
    let [inputElement] = $('#inputDelete');
    let index = inputElement.value;
    if (!index) return;
    let url = `http://localhost:5000/amigos/` + String(index);
    $.ajax(url, {
        type: 'DELETE'
    });
    usersListRequest();
}

let [viewFriendsButton] = $('#boton');
viewFriendsButton.addEventListener("click", usersListRequest);

let [searchButton] = $('#search');
searchButton.addEventListener("click", showFriendRequest);

let [deleteButton] = $('#delete');
deleteButton.addEventListener("click", deleteFriendRequest);
deleteButton.addEventListener("click", usersListRequest);
