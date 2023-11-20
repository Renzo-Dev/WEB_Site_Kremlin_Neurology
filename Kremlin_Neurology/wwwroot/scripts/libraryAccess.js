"use strict";

window.addEventListener('DOMContentLoaded',()=> {
    document.getElementById('sendPassword').addEventListener('click', function (event) {
        event.preventDefault();

        let password = document.getElementById('passwordField').value;

        fetch('/LibraryAccess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: password})
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Password set successfully')
        }).catch(error => {
            console.error('Error', error);
        });
    });
});