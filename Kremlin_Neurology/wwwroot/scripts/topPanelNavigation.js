"use strict";

document.addEventListener('DOMContentLoaded',()=> {

    // список элементов в top_panel
    let PanelItems = ["Обучение", "История", "Научная работа",
        "Клинические базы", "Библиотека", "Ежегодные конференции",
        "Научный кружок \"Школа молодых неврологов\"", "Новости и объявления", "Контактная информация"];

    // получаем top_nav_panel
    let topPanelContext = document.querySelector('.top_nav_panel');

    window.addEventListener('resize', renderTopPanel);
    renderTopPanel();
    
    function renderTopPanel(sIndex = 0) {
        while (topPanelContext.firstChild) {
            topPanelContext.removeChild(topPanelContext.firstChild);
        }
        let topPanelWidth = topPanelContext.clientWidth; // ширина top panel
        // let numberOfElements; // количество элементов в top_panel
        let tPanelItems = 0; // количество элементов в top_panel
        
        for (; tPanelItems < PanelItems.length; tPanelItems++) {
            let size = 0;
            for (let r = 0; r < PanelItems[tPanelItems].length; r++) {
                size += 10;
            }
            topPanelWidth -= size;
            if (topPanelWidth > 400) {
                console.error(topPanelWidth)
                const element = document.createElement('a');
                if (PanelItems[tPanelItems] !== 'Ежегодные конференции') {
                    element.setAttribute('href', '#');
                }
                element.textContent = PanelItems[tPanelItems];
                topPanelContext.appendChild(element);
            } else {
                return;
            }
        }
    }
});
    //     let tPanelItems = 0; // количество элементов в top_panel
    //
    //     // добавляем элементы в top_panel
    //     for (; tPanelItems < numberOfElements; tPanelItems++) {
    //     //         const element = document.createElement('a');
    //         if (topPanelItems[tPanelItems + index] !== 'Ежегодные конференции') {
    //             element.setAttribute('href', '#');
    //         }
    //         element.textContent = topPanelItems[tPanelItems + index];
    //         topPanelContext.appendChild(element);
    //     }
    //    
    //     // добавляем кнопку в конце, если количество элементов top_panel, меньше чем элементов массив "topPanelItems"
    //     if (tPanelItems < topPanelItems.length) {
    //         const bRight = document.querySelector('.bRight');
    //         bRight.style.visibility = 'visible';
    //
    //         topPanelContext.querySelectorAll('a').forEach(element => {
    //             element.classList.add('anim');
    //             console.log(element.classList)
    //         });
    //        
    //         bRight.addEventListener('click', () => {
    //             if (tPanelItems + index < topPanelItems.length) {
    //                 index++;
    //                 test(index);
    //             } else {
    //                 bRight.style.opacity = '0.5'
    //             }
    //         });
    //     }
    // }