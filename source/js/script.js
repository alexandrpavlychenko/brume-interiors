const tabButtons = document.querySelectorAll('.services-tab__menu-button');

for (let tabButton of tabButtons) {
    tabButton.addEventListener('click', function () {
        const selectedTabButton = document.querySelector('.services-tab__menu-button--selected');
        selectedTabButton.classList.remove('services-tab__menu-button--selected');
        selectedTabButton.setAttribute('aria-selected', 'false');

        tabButton.classList.add('services-tab__menu-button--selected');
        tabButton.setAttribute('aria-selected', 'true');

        const shownPanel = document.querySelector('[role="tabpanel"]:not([hidden])');
        shownPanel.hidden = true;
        shownPanel.classList.remove('services-tab-panel-content--shown');

        const panelId = tabButton.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        panel.hidden = false;
        panel.classList.add('services-tab-panel-content--shown');
    });
}

const paginationButtons = document.querySelectorAll('.reviews-slider__pagination-button');

function hideCurrentSlide() {
    const paginationButtonActive = document.querySelector('.reviews-slider__pagination-button--active');

    paginationButtonActive.classList.remove('reviews-slider__pagination-button--active');
    paginationButtonActive.setAttribute('aria-current', 'false');

    const shownSlide = document.querySelector('.reviews-slide:not([hidden])');
    shownSlide.hidden = true;
}

for (let paginationButton of paginationButtons) {
    paginationButton.addEventListener('click', function () {
        hideCurrentSlide();

        paginationButton.classList.add('reviews-slider__pagination-button--active');
        paginationButton.setAttribute('aria-current', 'true');

        const slideId = paginationButton.getAttribute('aria-controls');
        const slide = document.getElementById(slideId);
        slide.hidden = false;
    });
}

function getButtonActiveIndex() {
    const paginationButtonActive = document.querySelector('.reviews-slider__pagination-button--active');

    return [...paginationButtons].indexOf(paginationButtonActive);
}

function setPreviousSlide(buttonActiveIndex) {
    let slideId;

    if (buttonActiveIndex === 0) {
        paginationButtons[paginationButtons.length - 1].classList.add('reviews-slider__pagination-button--active');
        paginationButtons[paginationButtons.length - 1].setAttribute('aria-current', 'true');

        slideId = paginationButtons[paginationButtons.length - 1].getAttribute('aria-controls');
    } else {
        paginationButtons[buttonActiveIndex - 1].classList.add('reviews-slider__pagination-button--active');
        paginationButtons[buttonActiveIndex - 1].setAttribute('aria-current', 'true');

        slideId = paginationButtons[buttonActiveIndex - 1].getAttribute('aria-controls');
    }

    return document.getElementById(slideId);
}

function setNextSlide(buttonActiveIndex) {
    let slideId;

    if (buttonActiveIndex === paginationButtons.length - 1) {
        paginationButtons[0].classList.add('reviews-slider__pagination-button--active');
        paginationButtons[0].setAttribute('aria-current', 'true');

        slideId = paginationButtons[0].getAttribute('aria-controls');
    } else {
        paginationButtons[buttonActiveIndex + 1].classList.add('reviews-slider__pagination-button--active');
        paginationButtons[buttonActiveIndex + 1].setAttribute('aria-current', 'true');

        slideId = paginationButtons[buttonActiveIndex + 1].getAttribute('aria-controls');
    }

    return document.getElementById(slideId);
}

document.addEventListener('keydown', function (event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
        return;
    }

    const buttonActiveIndex = getButtonActiveIndex();

    hideCurrentSlide();

    if (event.key === 'ArrowLeft') {
        const slide = setPreviousSlide(buttonActiveIndex);
        slide.hidden = false;
    }

    if (event.key === 'ArrowRight') {
        const slide = setNextSlide(buttonActiveIndex);
        slide.hidden = false;
    }
});

const slider = document.querySelector('.reviews-slider');
let startX;

slider.addEventListener('mousedown', function (event) {
    startX = event.clientX;
});

slider.addEventListener('mouseup', function (event) {
    const endX = event.clientX;

    if (Math.abs(endX - startX) < 50) {
        return;
    }

    const buttonActiveIndex = getButtonActiveIndex();

    hideCurrentSlide();

    if ((startX - endX) >= 50) {
        const slide = setPreviousSlide(buttonActiveIndex);
        slide.hidden = false;
    }

    if ((endX - startX) >= 50) {
        const slide = setNextSlide(buttonActiveIndex);
        slide.hidden = false;
    }
});
