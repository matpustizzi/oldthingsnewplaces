'use strict';

const domready = require('domready');
const flickity = require('flickity');

domready(function(){
    console.log('test')
    const slider = new flickity( '.slider', {
        lazyLoad : true
    });
});