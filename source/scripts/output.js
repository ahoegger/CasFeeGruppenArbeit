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
        voteContent = '<div class="article-voting pull-left">Voting</div>';
        imageContent = '<div class="article-image pull-left">IMG=' + article.image + '</div>';
        articleContent =
            '<div class="article-content">' +
                '<div class="article-main">' +
                    '<h3 class="article-heading">' + article.title + '</h3>' +
                    '<p class="article-description">' + article.description + '</p>' +
                '</div>' +
                '<div class="article_meta">' +
                    '<div class="pull-left"><i class="fa fa-tags"><span class="article-tags">' + article.tags.join(' / ') + '</span></i></div>' +
                    '<div class="pull-right"><i class="fa fa-comments-o"><span class="article-comments">comments-popup</span></i></div>' +
                    '<div class="pull-right"><i class="fa fa-user"><span class="article-user">user-popup</span></i></div>' +
                    '<div class="pull-right"><i class="fa fa-calendar"><span class="article-date">date-popup</span></i></div>' +
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
