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
CASFEE.links = (function() {
    var inputTypeHandler = {
        "string": function(value) {
            return value;
        },
        "string-split": function(value) {
            return split(value, ",");
        }
    };

    function split(input, splitCharacter) {
        return input.split(splitCharacter);
    }

    return {
        shareLink: function(sharedLink) {
            // TODO implement adding sharedLink to list of available links
        },
        // Function to transform a form into an JSON object
        formToJson: function(submitForm) {
            var elementCounter = submitForm.elements.length,
                formElement,
                articleObject = {},
                articleJson,
                dataset,
                dataIncludeAttribute,
                dataType;
            // loop over all form elements and add only thos with data-casfee-include
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
            articleJson = JSON.stringify(articleObject);
            window.console.log("Article as json is " + articleJson);
            return articleJson;
        },
        processArticleForm: function(event) {
            window.console.dir(event);
            event.preventDefault();     // do not really submit
            var articleForm = event.srcElement,
                newArticleJson;
            newArticleJson = CASFEE.links.formToJson(articleForm);
            CASFEE.output.outputArticle(newArticleJson);
        }
    };
}());

(function() {
    var form = document.getElementById("share-link-form");
        form.addEventListener("submit", CASFEE.links.processArticleForm, false);
}());