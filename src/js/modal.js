const flickity = require('flickity');
require('flickity-imagesloaded');

const modalSlider = new flickity( '.js-modal-slider', {
    lazyLoad: 1,
    pageDots: false,
    prevNextButtons: true,
    percentPosition: true,
    setGallerySize: false
});

const projects = document.getElementsByClassName('js-project');
const modal = document.querySelector('.js-modal');
const captionTitle = document.querySelector('.modal-caption__title');
const captionText = document.querySelector('.modal-caption__text');


Array.from(projects).forEach((element) => {
    element.addEventListener('click', function(e) {
      openModal(this.dataset.slides);
      setModalTitle(this.dataset.project);
    });
});

const renderSlides = (slides) => {
    return slides.map( (slide,i) => {
        var el = document.createElement('div');
        el.className = 'modal-slider__slide'
        el.innerHTML = `<img class="js-slide-image modal-slider__image" data-flickity-lazyload="${ slide.file.url }" ${ slide.description ? `alt="${ slide.description }"` : '' }>`
        return el;
    } )
}

const openModal = (slides) => {
    var data = JSON.parse(slides)
    if(data){
        modal.classList.add('modal--visible');
        modalSlider.prepend(renderSlides(data));
        modalSlider.resize();
        //modalSlider.reposition();
    }
}

const setModalTitle = (title) => {
    captionTitle.textContent = title;
}

const caption = document.querySelector('.js-modal-caption')
const closeModal = () => {
    modal.classList.remove('modal--visible');
    var cells = modalSlider.getCellElements();
    modalSlider.remove(cells);
}

modal.addEventListener('click',(e) => {
    if(e.target.classList.contains('js-modal')) {
        closeModal();
    }
});

modalSlider.on( 'select', function() {
    captionText.textContent = modalSlider.selectedElement.querySelector('.js-slide-image').alt;
});