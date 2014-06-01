/* jshint -W097 */
"use strict";

/**
 * Created by holger on 25.05.2014.
 * This module contains functions for generating output on web pages
 * namespace CASFEE, see book "JavaScript Patterns, p. 89f
 */
var CASFEE = CASFEE || {};
CASFEE.namespace('CASFEE.output');

/**
 * Module for output functions
 */
CASFEE.output = (function() {

    /**
     * This function returns the jQeury node, to which the the article shall be added.
     * @param selector The jQuery selector for finding the node
     * @returns {*|jQuery|HTMLElement} the jQuery node inside whicht the article will be placed
     */
    function getArticleBase(selector) {
        return $(selector);
    }

    /**
     * This function adds as given html either as first node or as last article node to the given article container node
     * @param articleHtml {String} The plan article content HTML (without the row as a wrapper)
     * @param $node {jQuery} jQuery node inside which the artcile shall be added
     * @param placement {String} Either 'prepend' to add the article before or anything else to append the node
     */
    function addArticle(articleHtml, $node, placement) {
        var content = '<div class="row">' + articleHtml + '</div>';
        if(placement==='prepend') {
            $node.prepend(content);
        } else {
            $node.append(content);
        }
    }

    /**
     * This function transforms a given json string into an article object
     * TODO: Implement exception handling and validation as necessary
     * @param jsonArticle {String} A JSON string representing the article
     * @returns {article} The article object
     */
    function articleFromJson(jsonArticle) {
        return JSON.parse(jsonArticle);
    }
    /**
     * This function builds the HTML based in an article object
     * @param article The article object
     * @returns {String} The html string for the content of an article
     */
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
                    '<i class="fa fa-calendar icon-passive"></i><span class="article-date icon-spacer">' + moment(article.submitDate).fromNow() + '</span>' +
                    '<i class="fa fa-user icon-passive"></i><span class="article-user icon-spacer">user-popup</span>' +
                    '<i class="fa fa-comments-o icon-passive"></i><span class="article-comments icon-spacer">comments-popup</span>' +
                '</div>' +
            '</div>';
        return '<article><div class="column grid-12">' + voteContent + imageContent + articleContent + '</div></article>';
    }

    return {
        /**
         * This function adds (i.e. prepends) a given article to the result element of the document
         * @param article {String} JSON representation of an article
         */
        outputArticle: function(article) {
            addArticle(buildArticle(articleFromJson(article)), getArticleBase('#result'), 'prepend');
        }
    };
}());
