"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // Массив с элементами верхней панели
    const panelElements = [
        "Обучение", "История", "Научная работа",
        "Клинические базы", "Библиотека", "Ежегодные конференции",
        "Научный кружок \"Школа молодых неврологов\"", "Новости и объявления", "Контактная информация"
    ];

    // Ссылка на верхнюю навигационную панель
    let topNavPanel = document.querySelector('.top_nav_panel');

    // Обработчик события изменения размеров окна
    window.addEventListener('resize', () => {
        adjustPanel();
    });

    // Переменная для отслеживания начального индекса для panelElements
    let startIndex = 0;

    // Обработчик события щелчка по кнопке "вправо"
    document.getElementById('bRight').addEventListener('click', () => {
        startIndex++;
        adjustPanel();
    });

    // Начальная настройка панели
    adjustPanel();

    // Функция для корректировки верхней навигационной панели в зависимости от размера окна
    function adjustPanel() {
        // Получаем ширину верхней панели
        let topPanelWidth = topNavPanel.clientWidth;

        // Считаем количество видимых элементов в зависимости от ширины
        let count = 0;
        while (topPanelWidth > 150 && count < panelElements.length) {
            topPanelWidth -= 460;
            count++;
        }

        // Убеждаемся, что startIndex находится в пределах допустимых значений
        if (count + startIndex <= panelElements.length) {
            // Очищаем текущие элементы в панели
            while (topNavPanel.firstChild) {
                topNavPanel.removeChild(topNavPanel.firstChild);
            }

            // Создаем и добавляем элементы в панель
            for (let i = startIndex; i < count + startIndex; i++) {
                let elem = document.createElement('a');
                elem.textContent = panelElements[i];
                topNavPanel.appendChild(elem);
            }
        }
    }
});
