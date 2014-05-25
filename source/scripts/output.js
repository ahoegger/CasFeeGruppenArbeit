"use strict";

(function () {
    // but this function is sloppy...
}());


/**
 * Created by holger on 25.05.2014.
 * This module contains functions for generating output on web pages
 */
/* namespace CASFEE, see book "JavaScript Patterns, p. 89f */
var CASFEE = CASFEE || {};
CASFEE.namespace('CASFEE.output');

/* module pattern, see book "JavaScript Patterns, p. 97f */
CASFEE.output = (function() {
    return {
        outputArticle: function(article) {
            window.console.log("article is " + article);
        }
    };
}());
