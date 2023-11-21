"use strict";

window.addEventListener('DOMContentLoaded',()=> {
    document.getElementById('sendPassword').addEventListener('click', function (event) {
        event.preventDefault();
        let password = document.getElementById('passwordField').value;

        fetch('/checkPassword', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password: password})
        }).then(response => response.text())
            .then(data => {
                // Обновляем содержимое частичного представления
                document.getElementById('mainContent').innerHTML = data;
            })
            .catch(error => console.error('Error:', error));
    });
});