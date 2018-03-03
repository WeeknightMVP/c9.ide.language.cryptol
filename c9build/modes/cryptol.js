/* caption: Cryptol; extensions: .cry, .icry */

define(function(require, exports, module) {
    "use strict";
    
    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var CryptolHighlightRules = require("./cryptol_highlight_rules").CryptolHighlightRules;
    
    var Mode = function() {
        this.HighlightRules = CryptolHighlightRules;
    };
    oop.inherits(Mode, TextMode);
    
    (function() {
        // Extra logic goes here.
    }).call(Mode.prototype);
    
    exports.Mode = Mode;
});
