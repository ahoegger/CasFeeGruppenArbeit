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
        var content = '<div class="row" role="article">' + articleHtml + '</div>';
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
     * This function transforms a given json string into an array of comment
     * TODO: Implement exception handling and validation as necessary
     * @param jsonComments {String} A JSON string representing an array of comment
     * @returns {comment[]} The array of comment
     */
    function commentsFromJson(jsonComments) {
        return JSON.parse(jsonComments);
    }
    /**
     * This function builds the HTML based in an article object
     * @param article The article object
     * @returns {String} The html string for the content of an article
     */
    function buildArticle(article) {
        var voteContent,
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
                    '<span id="' + CASFEE.constants.get('ID_PREFIX_SHOW_COMMENTS') + article.id + '"><i class="fa fa-comments-o icon-passive"></i><span class="article-comments icon-spacer">comments-popup</span></span>' +
                '</div>' +
            '</div>';
        return '<article id=' + article.id + ' class="no-vertical-padding"><div class="column grid-12">' + voteContent + imageContent + articleContent + '</div></article>';
    }

    /**
     * This functions builds the HTML for a given array of comment objects
     * @param comments {comment[]} Array of comment objects
     */
    function buildComments(comments) {
        var inputFormHtml,
            commentsHtml,
            comment,
            singleCommentHtml,
            i;
        window.console.log("comments are " + comments);
        commentsHtml = "";
        inputFormHtml =
            '<form>' +
                '<div class="form-row">' +
                    '<input type="text" data-casfee-required="true" class="column grid-11 input-fullsize">' +
                    '<input type="submit" class="column grid-1" value="Submit">' +
                '</div>' +
            '</form>';
        i = comments.length -1;
        for (;i >= 0;) {
            comment = comments[i];
            singleCommentHtml =
                '<li>' +
                    '<i class="fa-li fa fa-comment-o icon-passive"></i>' + comment.comment +
                    '<div class="comment-meta">' +
                        '<i class="fa fa-calendar icon-passive"><span class="article-date icon-spacer">' + moment(comment.submitDate).fromNow() + '</span></i>' +
                        '<i class="fa fa-user icon-passive"><span class="article-user icon-spacer">' + comment.user + '</span></i>' +
                        '<i class="fa icon-passive fa-edit"><span class="article-user icon-spacer">Edit own comment</span></i>' +
                        '<i class="fa icon-passive fa-ban"><span class="article-user icon-spacer">Delete own comment</span></i>' +
                    '</div>' +
                '</li>';
            commentsHtml = singleCommentHtml + commentsHtml;
            i = i - 1;
        }
        return '<div id="' + CASFEE.constants.get('ID_PREFIX_COMMENTS') + comments.articleId + '" class="row comments no-vertical-padding">' +
            '<div class="column grid-12"><ul class="fa-ul comments-ul">' + commentsHtml + '</ul></div></div>';
    }

    /**
     * This functions add a comments HTML portion to an article identified by it's ID
     * @param commentsHtml {String} The HTML for the comments
     * @param articleId {String} The ID of the specific article
     */
    function addComments(commentsHtml, articleId) {
        var node;
        node = window.document.getElementById(articleId);
        node.innerHTML = node.innerHTML + commentsHtml;
    }

    /**
     * This function add the event handler to the articles meta comments information node
     * @param articleId
     */
    function addShowCommentsEventHandler(articleId) {
        var $targetNode;
        $targetNode = $('#' + CASFEE.constants.get('ID_PREFIX_SHOW_COMMENTS') + articleId);
        $targetNode.click({'articleId': articleId}, function($eventObject) {
           window.console.log('Clicked on me, with articleId ' + $eventObject.data.articleId);
        });
    }

    return {
        /**
         * This function adds (i.e. prepends) a given article to the result element of the document
         * @param article {String} JSON representation of an article
         */
        outputArticle: function(article) {
            var articleObject,
                dummyCommentsObject;
            articleObject = articleFromJson(article);
            addArticle(buildArticle(articleObject), getArticleBase('#result'), 'prepend');
            addShowCommentsEventHandler(articleObject.id);
            // FIXME HHE This is for development only
            dummyCommentsObject = [
                {
                    "articleId": articleObject.id,
                    "user": "Holger",
                    "submitDate": new Date(),
                    "comment": "This is my generic dummy comment for article " + articleObject.id
                }
            ];
            addComments(buildComments(dummyCommentsObject), articleObject.id);
        },

        /**
         * This function adds a JSON String representing all comments below a specific article, identified by an article
         * @param commentsJson {String} JSON String with all articles
         * @param articleId {String} ID of the article to which the comments shall be added
         */
        outputComments: function(commentsJson, articleId) {
            var commentsObject;
            commentsObject = commentsFromJson(commentsJson);
            addComments(buildComments(commentsObject), articleId);
        }
    };
}());
