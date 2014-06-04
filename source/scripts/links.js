/* jshint -W097 */
"use strict";

/**
 * Created by holger on 25.05.2014.
 * This module contains functions for link management, i.e. adding a links and stuff
 */
/* namespace CASFEE, see book "JavaScrip Patterns, p. 89f */
var CASFEE = CASFEE || {};
CASFEE.namespace('CASFEE.links');

/* module pattern, see book "JavaScript Patterns, p. 97f */
/* module pattern, see book "JavaScript Patterns, p. 97f */
CASFEE.links = (function () {
    var scrolled=0;
    var inputTypeHandler = {
        "string": function (value) {
            return value;
        },
        "string-split": function (value) {
            return split(value, ",");
        }
    };

    function split(input, splitCharacter) {
        return input.split(splitCharacter);
    }

    return {
        // Function to transform a form into an JSON object
        formToJson: function(submitForm) {
            var elementCounter = submitForm.elements.length,
                formElement,
                articleObject = {},
                articleJson,
                dataset,
                dataIncludeAttribute,
                dataType;
            // loop over all form elements and add only those with data-casfee-include
            for (; elementCounter > 0;) {
                formElement = submitForm[elementCounter-1];
                window.console.log("Element " + elementCounter + " has name " + formElement.name + " and is of tag type " + formElement.tagName);
                dataset = formElement.dataset;

                dataIncludeAttribute = dataset ? dataset.casfeeInclude : undefined;
                dataType = dataset ? dataset.casfeeType : "string";
                if (dataIncludeAttribute) {
                    articleObject[formElement.name] = inputTypeHandler[dataType](formElement.value);
                }
                elementCounter = elementCounter - 1;
            }
            // FIXME: Creation of ID must be done on the backend, but, hey, we don't have one so far
            articleObject.id = Date.now().valueOf();
            articleObject.submitDate = new Date(Date.now());
            articleJson = JSON.stringify(articleObject);
            window.console.log("Article as json is " + articleJson);
            return articleJson;
        },
        processArticleForm: function (event) {
            window.console.dir(event);
            event.preventDefault();     // do not really submit
            var articleForm = event.srcElement ? event.srcElement : event.target,
                newArticleJson;
            newArticleJson = CASFEE.links.formToJson(articleForm);
            CASFEE.output.outputArticle(newArticleJson);
        },

        toggleVisibleShareLink: function (event) {
            window.console.dir(event);
            $('#share').slideToggle(200);
        },
        
        /**
         * This function shows or hides the comments for a given article
         * @param event
         */
        toggleShowComments: function(event) {
            window.console.dir(event);
        },

        favoritesNavigationLeft: function (event){
            var favoritesContent = $('#favorites-content');
            var scrollHeight = favoritesContent.prop("scrollHeight");
            if(scrolled-82 >= 0) {
                scrolled = scrolled - 82;
                favoritesContent.animate({
                    scrollTop: scrolled
                });
                // disable button right
                if (scrolled-82 <= 0) {
                    $('#favorites-navigation-left').prop('disabled', true);
                }
                // ensure button left enabled
                $('#favorites-navigation-right').prop('disabled', false);
            }
        },

        favoritesNavigationRight: function (event){
            var favoritesContent = $('#favorites-content');
            var scrollHeight = favoritesContent.prop("scrollHeight");
            if(scrolled+82 <= scrollHeight) {
                scrolled = scrolled + 82;
                favoritesContent.animate({
                    scrollTop: scrolled
                });
                // disable button right
                if (scrolled+82 >= scrollHeight) {
                    $('#favorites-navigation-right').prop('disabled', true);
                }
                // ensure button left enabled
                $('#favorites-navigation-left').prop('disabled', false);
            }
        }
    };
}());

$(document).ready(function() {
    $('#share-link-form').on("submit", CASFEE.links.processArticleForm);
    $('#share-link-button').click(CASFEE.links.toggleVisibleShareLink);
    $("#share-link-form").find("input[data-casfee-required='true']")
        .blur(function() {
            this.value ? $(this).removeClass('form-error') : $(this).addClass('form-error');
        });
    $('#favorites-navigation-left').click(CASFEE.links.favoritesNavigationLeft);
    $('#favorites-navigation-right').click(CASFEE.links.favoritesNavigationRight);
});