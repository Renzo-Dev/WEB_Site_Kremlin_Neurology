"use strict";

document.addEventListener('DOMContentLoaded',()=> {

    // список элементов в top_panel
    let PanelItems = ["Обучение", "История", "Научная работа",
        "Клинические базы", "Библиотека", "Ежегодные конференции",
        "Научный кружок \"Школа молодых неврологов\"", "Новости и объявления", "Контактная информация"];

    // получаем top_nav_panel
    let topPanelContext = document.querySelector('.top_nav_panel');

    window.addEventListener('resize', test);
    
    test()
    function test() {
        const topPanelWidth = topPanelContext.clientWidth; // ширина top panel
        let numberOfElements; // количество элементов в top_panel

        PanelItems.forEach(item => {
            console.log(`Слово: ${item}`)
            let size = 0;
            for (let i =0;i<item.length;i++)
            {
                size += 17;
            }
            console.log(`Размер слова: ${size} px`);
        });
    }
    
    
    
    
    // test();
    //
    // function test(index = 0) {
    //     // определяем количество элементов в зависимости от ширины экрана
    //     const screenWidth = window.innerWidth;
    //     let numberOfElements; // количество элементов в top_panel
    //
    //     if (screenWidth < 480) {
    //         numberOfElements = 3;
    //     } else if (screenWidth < 1190) {
    //         numberOfElements = 4;
    //     } else if (screenWidth < 1190) {
    //         numberOfElements = 5;
    //     } else if (screenWidth < 1700) {
    //         numberOfElements = 6;
    //     } else if (screenWidth < 1800) {
    //         numberOfElements = 7;
    //     } else if (screenWidth < 1950) {
    //         numberOfElements = 8;
    //     } else {
    //         numberOfElements = 9;
    //     }
    //
    //     while (topPanelContext.firstChild) {
    //         topPanelContext.removeChild(topPanelContext.firstChild);
    //     }
    //
    //     let tPanelItems = 0; // количество элементов в top_panel
    //
    //     // добавляем элементы в top_panel
    //     for (; tPanelItems < numberOfElements; tPanelItems++) {
    //         const element = document.createElement('a');
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
});