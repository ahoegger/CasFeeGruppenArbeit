/* jshint -W097 */
"use strict";

/**
 * Created by holger on 25.05.2014.
 * This module contains functions for generating output on web pages
 */
/* namespace CASFEE, see book "JavaScript Patterns, p. 89f */
var CASFEE = CASFEE || {};
CASFEE.namespace('CASFEE.output');

/* module pattern, see book "JavaScript Patterns, p. 97f */
CASFEE.output = (function() {
    // this function builds a complete article
    function buildArticle(article) {
        var $newRow,
            voteContent,
            imageContent,
            articleContent;
        window.console.log("article is " + article);
        voteContent =
            '<div class="article-voting pull-left">' +
                '<div class="vote icon-passive icon-activatable position-top"><i class="fa fa-arrow-circle-o-up fa-2x"></i></div>' +
                '<div class="vote position-center">count</div>' +
                '<div class="vote icon-passive icon-activatable position-bottom"><i class="fa fa-arrow-circle-o-down fa-2x"></i></div>' +
            '</div>';
        imageContent = '<div class="article-image pull-left">IMG=' + article.image + '</div>';
        articleContent =
            '<div class="article-content">' +
                '<div class="article-main">' +
                    '<h3 class="article-heading">' + article.title + '</h3>' +
                    '<p class="article-description">' + article.description + '</p>' +
                '</div>' +
                '<div class="article-meta">' +
                    '<i class="fa fa-tags icon-passive"></i><span class="article-tags icon-spacer">' + article.tags.join(' / ') + '</span>' +
                    '<i class="fa fa-calendar icon-passive"></i><span class="article-date icon-spacer">date-popup</span>' +
                    '<i class="fa fa-user icon-passive"></i><span class="article-user icon-spacer">user-popup</span>' +
                    '<i class="fa fa-comments-o icon-passive"></i><span class="article-comments icon-spacer">comments-popup</span>' +
                '</div>' +
            '</div>';
        $newRow = $('#result').append('<div class="row"><article><div class="column grid-12">' + voteContent + imageContent + articleContent + '</div></article></div>');
    }

    return {
        outputArticle: function(article) {
            buildArticle(JSON.parse(article));
        }
    };
}());
