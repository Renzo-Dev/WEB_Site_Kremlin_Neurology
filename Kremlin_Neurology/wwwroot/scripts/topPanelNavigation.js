"use strict";


document.addEventListener('DOMContentLoaded', () => {
    // Массив с элементами верхней панели
    const panelElements = [
        "Обучение", "История", "Научная работа",
        "Клинические базы", "Библиотека", "Ежегодные конференции ▼",
        "Научный кружок \"Школа молодых неврологов\"", "Новости и объявления", "Контактная информация"
    ];

    // Ссылка на верхнюю навигационную панель
    let topNavPanel = document.querySelector('.top_nav_panel');

    // Переменные для отслеживания начального индекса и количества элементов в top_nav_panel
    let startIndex = 0;
    let navItemsCount = 0;
    
    // Ссылки на кнопки "влево" и "вправо"
    let bLeft = document.getElementById('bLeft');
    let bRight = document.getElementById('bRight');

    // Обработчик события изменения размеров окна
    window.addEventListener('resize', resizeNav);

    // Обработчик события щелчка по кнопке "влево"
    bLeft.addEventListener('click', () => {
        handleNavigationClick('left');
    });

    // Обработчик события щелчка по кнопке "вправо"
    bRight.addEventListener('click', () => {
        handleNavigationClick('right');
    });

    // Начальная настройка панели
    resizeNav();

    // Функция для обработки клика на кнопке навигации
    function handleNavigationClick(direction) {
        if ((direction === 'left' && startIndex > 0) ||
            (direction === 'right' && navItemsCount + startIndex < panelElements.length)) {
            animateNavigation(direction);
            updateNavigationState(direction);
        }
    }

    // Функция для анимации навигации
    function animateNavigation(direction) {
        const animationClass = direction === 'left' ? 'anim_left' : 'anim_right';

        if (!topNavPanel.querySelector('a').classList.contains(animationClass)) {
            topNavPanel.querySelectorAll('a').forEach(elem => {
                elem.classList.add(animationClass);
            });
        } else {
            topNavPanel.querySelectorAll('a').forEach(elem => {
                elem.classList.remove('anim_right', 'anim_left');
            });
        }

        setTimeout(() => {
            topNavPanel.querySelectorAll('a').forEach(elem => {
                elem.classList.remove('anim_right', 'anim_left');
            });
        }, 700);
    }

    // Функция для обновления состояния навигации
    function updateNavigationState(direction) {
        if (direction === 'left') {
            startIndex--;
        } else {
            startIndex++;
        }

        // Обновляем видимость кнопок
        updateButtonVisibility();

        // Обновляем контекст панели
        changeContext();
    }

    // Функция для обновления видимости кнопок
    function updateButtonVisibility() {
        bLeft.style.visibility = startIndex === 0 ? 'hidden' : 'visible';
        bRight.style.visibility = startIndex + navItemsCount === panelElements.length ? 'hidden' : 'visible';
    }
    
    // Функция для изменения контекста
    function changeContext() {
        for (let i = startIndex; i < navItemsCount + startIndex; i++) {
            let topNavElem = topNavPanel.querySelectorAll('a')[i - startIndex];
            topNavElem.textContent = panelElements[i];
        }
        manageDropDown();
    }
    
    let dropDownTopNavElement; // элемент top nav panel , к которому привязан dropdown-content
    let test = false;
    function showDropDownMenu() {
        let dropdownContent = document.getElementById('dropdown-content');
        dropdownContent.style.display = 'inline';
        dropdownContent.style.left = document.querySelector('.test').getBoundingClientRect().left + 25 + 'px';
        dropdownContent.querySelectorAll('a').forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                test = true;
            });
            elem.addEventListener('mouseleave', () => {
                test = false;
                hideDropDownMenu();
            });
        });
    }
    function hideDropDownMenu() {
        let dropdownContent = document.getElementById('dropdown-content');
        setTimeout(() => {
            if (test===false) {
                dropdownContent.style.display = 'none';
            }
        }, 200)
    }
    function manageDropDown() {
        topNavPanel.querySelectorAll('a').forEach(elem => {
            if (elem.textContent === "Ежегодные конференции ▼") {
                dropDownTopNavElement = topNavPanel;
                elem.classList.add('test');
                elem.addEventListener('mouseenter',showDropDownMenu);
                elem.addEventListener('mouseout',hideDropDownMenu)                
            }else {
                elem.classList.remove('test');
                elem.removeEventListener('mouseenter', showDropDownMenu);
                elem.removeEventListener('mouseenter', hideDropDownMenu);
            }
        })
    }

    // Функция для изменения размеров навигационной панели
    function resizeNav() {
        let topPanelWidth = topNavPanel.clientWidth;
        let count = 0;

        // Считаем количество видимых элементов в зависимости от ширины
        while (topPanelWidth > 150 && count < panelElements.length) {
            topPanelWidth -= 460;
            count++;
        }

        // Убеждаемся, что startIndex находится в пределах допустимых значений
        if (count + startIndex <= panelElements.length) {
            // Обновляем количество элементов в top_nav_panel
            updateNavItemCount(count);

            // Обновляем видимость кнопок
            updateButtonVisibility();

            // Обновляем контекст панели
            changeContext();
        }
    }

    // Функция для обновления количества элементов в зависимости от ширины в top_nav_panel
    
    // если у нас нету 
    function updateNavItemCount(count) {
        if (count > navItemsCount) {
            for (let i = navItemsCount; i < count; i++) {
                let elem = document.createElement('a');
                topNavPanel.appendChild(elem);
                navItemsCount = count;
            }
        } else if (count < navItemsCount) {
            for (let i = navItemsCount; i > count; i--) {
                if (topNavPanel.firstChild) {
                    topNavPanel.removeChild(topNavPanel.firstChild);
                    navItemsCount = count;
                } else {
                    break;
                }
            }
        }
    }
});