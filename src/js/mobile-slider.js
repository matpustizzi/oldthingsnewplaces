const flickity = require('flickity');
const mobileSliders = document.getElementsByClassName('js-mobile-slider');
import Player from '@vimeo/player'

Array.from(mobileSliders).forEach((element) => {

    var slider = new flickity(element, {
        lazyLoad: 2,
        pageDots: false,
        prevNextButtons: false,
        percentPosition: true,
        setGallerySize: false,
        watchCSS: true
    })

    var selectedEl = slider.selectedElement;

    slider.on('settle', () => {
        if (slider.selectedElement != selectedEl) {
            if (selectedEl) {
                var iframe = selectedEl.querySelector('.js-vimeo-player')
                if (iframe) {
                    const player = new Player(iframe);
                    player.pause()
                }
            }
            selectedEl = slider.selectedElement;
        }
    })
});