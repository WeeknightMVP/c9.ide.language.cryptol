define(function(require, exports, module) {
    "use strict";
    
    /**
     * Returns an array of highlighter rules for Cryptol line and/or nested block comments that return to the indicated `next` tokenizer state.
     * 
     * @param {string} next - tokenizer state to enter upon terminating a comment
     */
    function comments(next) {
        return [ 
            { token: 'punctuation.definition.comment.cryptol',
              regex: '//',
              push: [ { token: 'comment.line.double-slash.cryptol',
                        regex: '$|^',
                        next: 'pop' },
                      { defaultToken: 'comment.line.double-slash.cryptol' } ] },
            { include: '#block_comment' } 
        ];
    }
    
    let oop = require("ace/lib/oop");
    
    let TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
    
    let numericRe = /\b(?:[0-9](?:[0-9]|_(?=_*[0-9]))*|0(?:x[0-9a-fA-F_]*[0-9a-fA-F]|o[0-7_]*[0-7]|b[0-1_]*[0-1]))\b/;
    let escapedRe = "\\\\(?:"
      + /* named */ "(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\"'&])"
      + /* octal */ "|o0*[1-3]?[0-7]{1,2}"
      + /* hex */ "|x0*[0-9a-fA-F]{1,2}"
      + /* dec */ "|2(?:[0-4][0-9]|5[0-5])|1[0-9]{2}|0*(?:[0-9]{1,2})"
      + ")";
    let identifierRe = "(?:[A-Za-z_][A-Za-z0-9_']*)";
    let symbolicOperatorRe = "(?:[~!#$\\^&*?+:\\-.=</>\\\\|]+)";
    let symbolRe = "(?:" + identifierRe + "|" + symbolicOperatorRe + ")";
    let moduleIdentifierRe = "(?:" + identifierRe + "(?:::" + identifierRe + ")*)";
    let qualifiedSymbolRe = "(?:" + symbolRe + "(?:::" + symbolRe + ")*)";
    let supportClassRe = /\b(?:Arith|Cmp|fin|Integer|Inf|Logic|SignedCmp|Zero)\b/;
    let supportSymbolPreludeRe = /\b(?:carry|complement|demote|drop|error|fromInteger|fromThen|fromThenTo|fromTo|groupBy|infFrom|infFromThen|join|lg2|max|min|negate|pdiv|pmod|pmult|random|reverse|sborrow|scarry|sext|split|splitAt|tail|take|toInteger|trace|traceVal|transpose|update|updateEnd|updates|updatesEnd|width|zero|zext|integer|undefined)\b/;
    let supportTypeRe = /\bBit|Bool|Char|String|Word\b/;
    
    let CryptolHighlightRules = function(options) {
      this.$rules = {
        start:
         [ comments('start'),
           { token: 'keyword.other.cryptol',
             regex: /\bmodule\b/,
             next: '#module_name' },
           { token: 'keyword.other.cryptol',
             regex: /\bimport\b/,
             next: '#import_name' },
           { token: 'keyword.other.cryptol',
             regex: /\binclude\b/,
             push:
              [ { token: 'punctuation.filename.start.cryptol',
                  regex: /"/,
                  next: '#include' } ] },
           { token: 'punctuation.definition.string.begin.cryptol',
             regex: /"/,
             push:
              [ { token: 'constant.character.escape.cryptol',
                  regex: escapedRe },
                { token: 'punctuation.definition.string.end.cryptol',
                  regex: /"/,
                  next: 'pop' },
                { defaultToken: 'string.quoted.double.cryptol' } ] },
           { token:
              [ 'punctuation.definition.string.begin.cryptol',
                'constant.character.escape.cryptol',
                'punctuation.definition.string.end.cryptol' ],
             regex: "(')(" + escapedRe + ")(')" },
           { token:
              [ 'punctuation.definition.string.begin.cryptol',
                'constant.character.cryptol',
                'punctuation.definition.string.end.cryptol' ],
             regex: "(')(.)(')" },
           { token: 'constant.language.empty-tuple.cryptol', regex: /\(\)/ },
           { token: 'constant.language.empty-sequence.cryptol', regex: /\[\]/ },
           { token: 'constant.language.empty-record.cryptol', regex: /\{\}/ },
           { token: 'constant.language.boolean.cryptol',
             regex: /\b(?:True|False)\b/ },
           { token: 'keyword.operator.cryptol',
             regex: /\b(?:else|if|then|\||==>|\\\/|\/\\|->|!=|==|>|<|<=|>=|<\$|>\$|<=\$|>=\$|\|\||-|&&|#|>>|<<|>>>|<<<|>>\$|\+|-|\*|\/|%|\/\$|%\$|--|!|!!|@|@@|~|=|`)\b/ },
           { token: 'keyword.other.cryptol',
             regex: /\b(?:infix|infixl|infixr|let|parameter|primitive|private|where)\b/ },
           { token: 'invalid.deprecated.cryptol',
             regex: /\b(?:extern|pragma)\b/ },
           { token: 'storage.type.cryptol',
             regex: /\b(?:constraint|newtype|property|type)\b/ },
           { token: 'support.class.cryptol', regex: supportClassRe },
           { token: 'support.symbol.prelude.cryptol', regex: supportSymbolPreludeRe },
           { token: 'support.type.cryptol', regex: supportTypeRe },
           { token: 'constant.numeric.cryptol',
             regex: numericRe },
           { token: 'punctuation.separator.comma.cryptol', regex: /,/ },
           { token: 'keyword.operator.cryptol',
             regex: symbolicOperatorRe },
           { token: 'variable.symbol.cryptol',
             regex: "\\((" + qualifiedSymbolRe + ")\\)",
             /*next: '#symbol_definition'*/ },
           { token: 'variable.symbol.cryptol',
             regex: "(?:" + qualifiedSymbolRe + ")",
             /*next: '#symbol_definition'*/ }
        ],
        '#block_comment':
         [ { token: 'punctuation.definition.comment.cryptol',
             regex: /\/\*/,
             push:
              [ { include: '#block_comment' },
                { token: 'punctuation.definition.comment.cryptol',
                  regex: /\*\//,
                  next: 'pop' },
                { defaultToken: 'comment.block.cryptol' } ] } ],
        '#module_name':
         [ comments('#module_name'),
           { token: 'keyword.other.cryptol', regex: /\bwhere\b/, next: 'start' },
           { token: 'entity.name.other.module.cryptol', regex: moduleIdentifierRe },
           { token: 'keyword.operator.cryptol', 
             regex: /=/,
             next: '#parent_module_name'},
           { defaultToken: 'meta.declaration.module.cryptol' } ],
        '#parent_module_name':
         [ comments('#parent_module_name'),
           { token: 'keyword.other.cryptol', regex: /\bwhere\b/, next: 'start' },
           { token: 'entity.name.other.parent-module.cryptol', regex: moduleIdentifierRe },
           { defaultToken: 'meta.declaration.module.cryptol' }
         ],
        '#import_list':
         [ comments('#import_list'),
           { token: 'punctuation.import-list.end.cryptol', regex: /\)/, next: 'start' },
           { token: 'punctuation.separator.comma.cryptol', regex: /,/ },
           { token: 'support.variable.cryptol', regex: identifierRe },
           { defaultToken: 'meta.declaration.import-list.cryptol' } ],
        '#import_name':
         [ { token: 'meta.import.cryptol', regex: /$/, next: 'start' },
           { token: 'keyword.other.cryptol', regex: /\bas|hiding\b/ },
           { token: 'keyword.operator.backtick', regex: /`/ },
           { token: 'entity.name.other.import.cryptol', regex: moduleIdentifierRe },
           { token: 'punctuation.import-list.start.cryptol',
             regex: /\(/,
             next: '#import_list' },
           { defaultToken: 'meta.import.cryptol' } ],
        '#include':
         [ { token: 'entity.name.other.include.cryptol',
             regex: /(?:[^"]|\\")+/ },
           { token: 'punctuation.filename.end.cryptol',
             regex: '"',
             next: 'start' } ],
      };
      
      this.normalizeRules();
    };
    
    CryptolHighlightRules.metaData = {
        fileTypes: [ 'cry' ],
        keyEquivalent: '^~H',
        name: 'Cryptol',
        scopeName: 'source.cryptol'
    };
    
    oop.inherits(CryptolHighlightRules, TextHighlightRules);
    
    exports.CryptolHighlightRules = CryptolHighlightRules;
});
