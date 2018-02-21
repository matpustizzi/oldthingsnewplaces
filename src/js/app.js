'use strict';

const flickity = require('flickity');
const domready = require('domready');

domready(function(){

    var mobileSliders = document.getElementsByClassName('js-mobile-slider');

    Array.from(mobileSliders).forEach((element) => {
        new flickity( element, {
            lazyLoad: 2,
            pageDots: false,
            prevNextButtons: false,
            percentPosition: true,
            setGallerySize: false,
            watchCSS: true
        })
    });
    

    require('./modal');

});