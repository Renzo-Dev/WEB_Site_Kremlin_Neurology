"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Array with top panel elements
    // Массив с элементами верхней панели
    const panelElements = [
        "Обучение", "История", "Научная работа",
        "Библиотека", "Клинические базы", "Ежегодные конференции ▼",
        "Научный кружок \"Школа молодых неврологов\"", "Новости и объявления", "Контактная информация"
    ];
    const hRefElements = ["/edu.htm", "#", "#", "/library.htm", "#", "#", "#", "#", "#", "#"];

    // Reference to the top navigation panel
    // Ссылка на верхнюю навигационную панель
    let topNavPanel = document.querySelector('.top_nav_panel');

    // Variables to track initial index and the number of items in top_nav_panel
    // Переменные для отслеживания начального индекса и количества элементов в top_nav_panel
    let startIndex = 0;
    let navItemsCount = 0;

    // References to "left" and "right" buttons
    // Ссылки на кнопки "влево" и "вправо"
    let bLeft = document.getElementById('bLeft');
    let bRight = document.getElementById('bRight');

    // Event listener for window resize
    // Обработчик события изменения размеров окна
    window.addEventListener('resize', resizeNav);

    // Click event listeners for "left" and "right" buttons
    // Обработчики событий клика по кнопкам "влево" и "вправо"
    bLeft.addEventListener('click', () => {
        handleNavigationClick('left');
    });

    bRight.addEventListener('click', () => {
        handleNavigationClick('right');
    });

    // Initial panel setup
    // Начальная настройка панели
    resizeNav();

    // Function to handle navigation button click
    // Функция для обработки клика на кнопке навигации
    function handleNavigationClick(direction) {
        if ((direction === 'left' && startIndex > 0) ||
            (direction === 'right' && navItemsCount + startIndex < panelElements.length)) {
            animateNavigation(direction);
            updateNavigationState(direction);
        }
    }

    // Function for animating navigation
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
        }, 600);
    }

    // Function to update navigation state
    // Функция для обновления состояния навигации
    function updateNavigationState(direction) {
        if (direction === 'left') {
            startIndex--;
        } else {
            startIndex++;
        }

        // Update button visibility
        // Обновляем видимость кнопок
        updateButtonVisibility();

        // Update panel context
        // Обновляем контекст панели
        changeContext();
    }

    // Function to update button visibility
    // Функция для обновления видимости кнопок
    function updateButtonVisibility() {
        bLeft.style.visibility = startIndex === 0 ? 'hidden' : 'visible';
        bRight.style.visibility = startIndex + navItemsCount === panelElements.length ? 'hidden' : 'visible';
    }

    // Function to change panel context
    // Функция для изменения контекста
    function changeContext() {
        setTimeout(() => {
            for (let i = startIndex; i < navItemsCount + startIndex; i++) {
                let topNavElem = topNavPanel.querySelectorAll('a')[i - startIndex];
                topNavElem.textContent = panelElements[i];
                topNavElem.setAttribute("href", `${hRefElements[i]}`);
                topNavElem.setAttribute("title", `${panelElements[i]}`);
            }
            manageDropDown();
        }, 150);
    }

    // Element in top nav panel associated with dropdown-content
    // Элемент top nav panel, к которому привязан dropdown-content
    let dropDownTopNavElement;
    let isDropDownVisible = false;

    
    function showDropDownMenu() {
        // Show dropdown menu and set its position
        // Показать выпадающее меню и установить его позицию
        let dropdownContent = document.getElementById('dropdown-content');
        dropdownContent.style.display = 'inline';
        let elem = topNavPanel.querySelectorAll('a');
        elem.forEach(el => {
            if (el.textContent === "Ежегодные конференции ▼") {
                dropdownContent.style.left = el.getBoundingClientRect().left + (el.getBoundingClientRect().width - dropdownContent.getBoundingClientRect().width) / 2 + 'px';
                dropdownContent.style.top = el.getBoundingClientRect().top + 47 + 'px';
            }
        });
        // Add event listeners for mouseenter and mouseleave to dropdown-content links
        // Добавить обработчики событий для mouseenter и mouseleave для ссылок в dropdown-content
        dropdownContent.querySelectorAll('a').forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                isDropDownVisible = true;
            });
            elem.addEventListener('mouseleave', () => {
                isDropDownVisible = false;
                hideDropDownMenu();
            });
        });
    }

    function hideDropDownMenu() {
        // Hide dropdown menu after a delay if test is false
        // Скрыть выпадающее меню после задержки, если test равен false
        let dropdownContent = document.getElementById('dropdown-content');
        setTimeout(() => {
            if (isDropDownVisible === false) {
                dropdownContent.style.display = 'none';
            }
        }, 200)
    }

    function manageDropDown() {
        // Manage dropdown menu visibility and event listeners for top_nav_panel links
        // Управление видимостью выпадающего меню и обработчиками событий для ссылок top_nav_panel
        topNavPanel.querySelectorAll('a').forEach(elem => {
            if (elem.textContent === "Ежегодные конференции ▼") {
                dropDownTopNavElement = topNavPanel;
                elem.classList.add('test');
                elem.addEventListener('mouseenter', showDropDownMenu);
                elem.addEventListener('mouseout', hideDropDownMenu)
            } else {
                elem.classList.remove('test');
                elem.removeEventListener('mouseenter', showDropDownMenu);
                elem.removeEventListener('mouseenter', hideDropDownMenu);
            }
        })
    }

    // Function to resize the navigation panel
    // Функция для изменения размеров навигационной панели
    function resizeNav() {
        let topPanelWidth = topNavPanel.clientWidth;
        let count = 0;

        // Calculate the number of visible elements based on width
        // Считаем количество видимых элементов в зависимости от ширины
        while (topPanelWidth > 150 && count < panelElements.length) {
            topPanelWidth -= 350;
            count++;
        }

        // Ensure startIndex stays within valid limits
        // Убеждаемся, что startIndex находится в пределах допустимых значений
        if (count + startIndex <= panelElements.length) {
            // Update the number of elements in top_nav_panel
            // Обновляем количество элементов в top_nav_panel
            updateNavItemCount(count);

            // Update button visibility
            // Обновляем видимость кнопок
            updateButtonVisibility();

            // Update panel context
            // Обновляем контекст панели
            changeContext();
        }
    }

    // Function to update the number of elements in top_nav_panel based on width
    // Функция для обновления количества элементов в зависимости от ширины в top_nav_panel
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
