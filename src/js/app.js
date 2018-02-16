'use strict';

const domready = require('domready');
const flickity = require('flickity');

domready(function(){
    const slider = new flickity( '.slider', {
        lazyLoad : 1,
        pageDots: false,
        prevNextButtons: false
    });
});