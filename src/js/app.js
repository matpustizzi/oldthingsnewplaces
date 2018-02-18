'use strict';

const flickity = require('flickity');
const domready = require('domready');

domready(function(){
    const slider = new flickity( '.slider', {
        lazyLoad : 1,
        pageDots: false,
        prevNextButtons: false
    });

    require('./modal');
    
});