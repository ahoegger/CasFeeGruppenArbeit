/* jshint -W097 */
"use strict";

/**
 * Created by holger on 21.05.2014.
 */

/* namespace CASFEE, see book "JavaScrip Patterns, p. 89f */
var CASFEE = CASFEE || {};
CASFEE.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = CASFEE,
        i;
// strip redundant leading global
    if (parts[0] === "CASFEE") {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
// create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

var CASFEE = CASFEE || {};
CASFEE.namespace('CASFEE.consts');

CASFEE.constants = (function () {
    var my_constants = {
      'ID_PREFIX_SHOW_COMMENTS': 'show-hide-comments-for-article-id-',
      'ID_PREFIX_COMMENTS': 'comments-for-article-id-'
    };
    return {
        get: function(name) {
            return my_constants[name];
        }
    };
})();