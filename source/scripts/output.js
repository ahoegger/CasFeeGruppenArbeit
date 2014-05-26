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
    var outputMethods = {
        articleElement: function(rootNode) {
            return nodeHelper.appendNode(rootNode, "article");
        },
        articleColumnElement: function(rootNode) {
            return nodeHelper.appendNode(rootNode, "div", "column grid-12");
        },
        votingElement: function(rootNode, article) {
            return nodeHelper.appendNode(rootNode, "div", "article-voting pull-left");
        },
        votingContent: function(node, article) {
            node.innerText = "Vote for " + article.title;
        },
        imageElement: function(rootNode, article) {
            return nodeHelper.appendNode(rootNode, "div", "article-image pull-left");
        },
        imageContent: function(imageNode, article) {
            imageNode.innerText = "IMAGE URL=" + article.image;
        },
        articleContentElement: function(rootNode, article) {
            return nodeHelper.appendNode(rootNode, "div", "article-content");
        },
        articleContent: function(node, article) {
            var innerHtmlMeta,
                innerHtmlMain,
                tagsList = "",
                tagsSize,
                i;
            innerHtmlMain = '<div class="article-main">' +
                '<h3 class="article-heading">' + article.title + '</h3>' +
                '<p class="article-description">' + article.description + '</p>' +
                '</div>';
            if (article.tags !== undefined) {
                tagsSize = article.tags.length;
                for (i = 0; i < tagsSize; i++) {
                    tagsList += article.tags[i];
                    if(i !== tagsSize) {
                        tagsList += " / ";
                    }
                }
            } else {
                tagsList = "";
            }
            innerHtmlMeta = '<div class="article_meta">' +
                '<div class="pull-left"><i class="fa fa-tags"><span class="article-tags">' + tagsList + '</span></i></div>' +
                '<div class="pull-right"><i class="fa fa-comments-o"><span class="article-comments">comments-popup</span></i></div>' +
                '<div class="pull-right"><i class="fa fa-user"><span class="article-user">user-popup</span></i></div>' +
                '<div class="pull-right"><i class="fa fa-calendar"><span class="article-date">date-popup</span></i></div>' +
                '</div>';
            node.innerHTML = innerHtmlMain + innerHtmlMeta;
        }
    };
    var nodeHelper = {
        appendRowToRow: function(rootNode, classes, idName) {
            return nodeHelper.appendNode(rootNode.parentElement, "div", classes, idName);
        },
        appendNode: function(rootNode, nodeType, classes, idName) {
            var newNode;
            newNode = document.createElement(nodeType);
            if (classes !== undefined) {
                newNode.className = classes;
            }
            if (idName !== undefined) {
                newNode.id = idName;
            }
            rootNode.appendChild(newNode);
            return newNode;
        }
    };

    // this function builds a complete article
    function buildArticle(article) {
        var newRow,
            articleElement,
            articleColumnElement;
        window.console.log("article is " + article);
        newRow = nodeHelper.appendRowToRow(document.getElementById("articles_section").lastElementChild, "row");
        articleElement = outputMethods.articleElement(newRow);
        articleColumnElement = outputMethods.articleColumnElement(articleElement);
        outputMethods.votingContent(outputMethods.votingElement(articleColumnElement, article), article);
        outputMethods.imageContent(outputMethods.imageElement(articleColumnElement, article), article);
        outputMethods.articleContent(outputMethods.articleContentElement(articleColumnElement, article), article);
    }

    return {
        outputArticle: function(article) {
            buildArticle(JSON.parse(article));
        }
    };
}());
