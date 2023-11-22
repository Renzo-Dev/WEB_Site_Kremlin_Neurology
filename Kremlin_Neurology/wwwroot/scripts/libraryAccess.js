"use strict";

// Ждем загрузки контента страницы
window.addEventListener('DOMContentLoaded', () => {
    // Получаем основной контент
    let mainContent = document.getElementById('mainContent');

    // Получаем поле ввода пароля
    let inputPassword = mainContent.querySelector('input');
    inputPassword.addEventListener('input', () => {
        // Скрываем сообщение об ошибке при вводе пароля
        let errorMessage = mainContent.querySelector('#errorMessage');
        if (errorMessage.style.display === 'inline') {
            errorMessage.style.display = 'none';
        }
        // Отображаем кнопку отправки при вводе пароля более 3 символов
        let sendPasswordBtn = mainContent.querySelector('#sendPassword');
        if (inputPassword.value.length > 3 && !inputPassword.classList.contains('activeButton')) {
            sendPasswordBtn.style.display = 'inline';
        } else if (inputPassword.value.length <= 3) {
            sendPasswordBtn.style.display = 'none';
        }
    });

    // Обработчик события нажатия кнопки отправки пароля
    document.getElementById('sendPassword').addEventListener('click', async function (event) {
        event.preventDefault();
        let password = document.getElementById('passwordField').value;
        let regex = /^[a-zA-Z0-9!@#]+$/;

        // Проверяем пароль на соответствие регулярному выражению
        if (regex.test(password)) {
            try {
                // Отправляем запрос на сервер для проверки пароля
                let response = await fetch('/checkPassword', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: password })
                });

                // Проверяем статус ответа
                if (response.status === 401) {
                    // Показываем сообщение об ошибке для неверного пароля
                    let errorMessage = mainContent.querySelector('#errorMessage');
                    errorMessage.textContent = 'Ошибка, неверный пароль';
                    errorMessage.style.display = 'inline';
                    console.log('Ошибка: Неавторизованный доступ');
                    throw new Error('Unauthorized'); // Генерируем ошибку для перехода в блок catch
                }

                // Получаем текст ответа и обновляем основной контент
                let data = await response.text();
                mainContent.innerHTML = data;
            } catch (error) {
                // Обрабатываем ошибку, выводим в консоль сообщение об ошибке, исключая статус 401
                if (error.message !== 'Unauthorized') {
                    console.error('Ошибка:', error);
                }
            }
        } else {
            // Показываем сообщение об ошибке для некорректного пароля
            let errorMessage = mainContent.querySelector('#errorMessage');
            errorMessage.textContent = 'Некорректный пароль';
            errorMessage.style.display = 'inline';
        }
    });
});
