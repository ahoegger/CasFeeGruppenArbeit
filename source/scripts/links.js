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
    return {
        shareLink: function(sharedLink) {
            window.console.log("adding link is " + sharedLink);
            window.console.dir(sharedLink);
        },
        // Function to transform a form into an JSON object
        formToJson: function(submitForm) {
            var elementCounter = submitForm.elements.length,
                formElement,
                articleObject = {},
                articleJson,
                dataset;
            for (; elementCounter > 0;) {
                formElement = submitForm[elementCounter-1];
                window.console.log("Element " + elementCounter + " has name " + formElement.name + " and is of tag type " + formElement.tagName);
                dataset = formElement.dataset;
                window.console.dir(dataset);
                window.console.log("data-casfee is " + formElement.dataset ? formElement.dataset.casfee : "missing");
                articleObject[formElement.name] = formElement.value;
                elementCounter = elementCounter - 1;
            }
            articleJson = JSON.stringify(articleObject);
            window.console.log("Article as json is " + articleJson);
        }
    };
}());

(function() {
    var form = document.getElementById("share-link-form");
    form.addEventListener("submit", function() {
            CASFEE.links.formToJson(this);
            CASFEE.links.shareLink(this);
        }, false
    );
    window.console.log("Added event listener!");
}());