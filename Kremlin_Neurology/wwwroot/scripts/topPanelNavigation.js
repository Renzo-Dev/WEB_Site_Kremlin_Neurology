"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // Массив с элементами верхней панели
    const panelElements = [
        "Обучение", "История", "Научная работа",
        "Клинические базы", "Библиотека", "Ежегодные конференции",
        "Научный кружок \"Школа молодых неврологов\"", "Новости и объявления", "Контактная информация"
    ];

    // top nav panel
    let topNavPanel = document.querySelector('.top_nav_panel');

    let startIndex = 0;
    document.getElementById('bRight').addEventListener('click', () => {
        startIndex++;
        test();
    });
    
    test()
    function test() {

        // получаем количество переменных элементво в зависимости от размера
        let topPanelWidth = topNavPanel.clientWidth; // ширина top panel
        let count = 0;
        while (topPanelWidth > 150) {
            topPanelWidth -= 460;
            if (count < panelElements.length) {
                count++;
            } else {
                break;
            }
        }

        if (4 + startIndex < panelElements.length + 1) {
            while (topNavPanel.firstChild) {
                topNavPanel.removeChild(topNavPanel.firstChild);
            }
            // создаем 4 элемента для панели
            for (let i = startIndex; i < 4 + startIndex; i++) {
                let elem = document.createElement('a');
                elem.textContent = panelElements[i];
                topNavPanel.appendChild(elem);
            }
        }
    }
});