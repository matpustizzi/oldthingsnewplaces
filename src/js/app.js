'use strict';

const domready = require('domready');
const flickity = require('flickity');

domready(function(){
    const slider = new flickity( '.slider', {
        lazyLoad : 1,
        pageDots: false,
        prevNextButtons: false
    });

    const modalSlider = new flickity( '.js-modal-slider', {
        lazyLoad : 2,
        pageDots: false,
        prevNextButtons: true
    });

    const projects = document.getElementsByClassName('js-project');
    const modal = document.querySelector('.js-modal');

    Array.from(projects).forEach((element) => {
        element.addEventListener('click', function(e) {
          openModal(this.dataset.slides);
        });
    });

    const openModal = (slides) => {
        if(slides){
            modal.classList.add('modal--visible');
        }
    }

    const closeModal = () => {
        modal.classList.remove('modal--visible');
        var cells = modalSlider.getCellElements();
        modalSlider.remove(cells);
    }

    modal.addEventListener('click',(e) => {
        if(e.target.classList.contains('js-modal')) {
            closeModal();
        }
        
    })
    
});