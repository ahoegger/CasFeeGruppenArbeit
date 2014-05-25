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
        articleElement: function(rootNode, article) {
            return nodeHelper.appendNode(rootNode, "article");
        },
        articleColumnElement: function(rootNode, article) {
            return nodeHelper.appendNode(rootNode, "div", "column grid-12");
        },
        votingElement: function(rootNode, article) {
            return nodeHelper.appendNode(rootNode, "div", "article-voting pull-left");
        },
        votingContent: function(node, article) {
            node.innerText = "Vote!";
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
            node.innerText = article.title;
        },
        meta: function(rootNode, article) {
            // TODO print the article
        }
    };
    var nodeHelper = {
        findNodeByClass: function(rootNode, className) {
            // TODO implement
        },
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
        articleElement = outputMethods.articleElement(newRow, article);
        articleColumnElement = outputMethods.articleContentElement(articleElement, article);
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
