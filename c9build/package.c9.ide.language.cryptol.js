define("plugins/c9.ide.language.cryptol/package.c9.ide.language.cryptol", [], {
    "name": "c9.ide.language.cryptol",
    "description": "Experimental Cloud9 Plugin for Cryptol",
    "version": "0.0.1",
    "author": "https://github.com/WeeknightMVP",
    "contributors": [],
    "repository": {
        "type": "git",
        "url": "https://github.com/WeeknightMVP/c9.ide.language.cryptol.git"
    },
    "categories": [
        "miscellaneous"
    ],
    "licenses": [
        "BSD-3-Clause"
    ],
    "c9": {
        "plugins": [
            {
                "packagePath": "plugins/c9.ide.language.cryptol/c9.ide.language.cryptol"
            },
            {
                "packagePath": "plugins/c9.ide.language.cryptol/__static__"
            }
        ]
    }
});

define("plugins/c9.ide.language.cryptol/__static__",[], function(require, exports, module) {
    main.consumes = [
        "Plugin", "plugin.debug"
    ];
    main.provides = [];
    return main;
    function main(options, imports, register) {
        var debug = imports["plugin.debug"];
        var Plugin = imports.Plugin;
        var plugin = new Plugin();
        plugin.version = "0.0.1";
        plugin.on("load", function load() {
            [
                {
                    "type": "modes",
                    "filename": "cryptol.js",
                    "data": "caption: Cryptol; extensions: .cry, .icry"
                },
                {
                    "type": "outline",
                    "filename": "cryptol.outline",
                    "data": "{\n    languages: [\"cry\"],\n    extensions: [\"cry\"],\n\n    guess_fargs: false,\n    extract_docs: true,\n\n    tags: [\n        { regex: /(?:^|\\n)\\s*module\\s+([A-Za-z_][A-Za-z0-9_']*(?:::[A-Za-z_][A-Za-z0-9_']*)*)/g, kind: \"package\" },\n        { regex: /(?:^|\\n)\\s*import\\s+(`?[A-Za-z_][A-Za-z0-9_']*(?:::[A-Za-z_][A-Za-z0-9_']*)*)/g, kind: \"package\" },\n        { regex: /(?:^|\\n)\\s*(?:new)?type\\s+((?!constraint)[A-Za-z_][A-Za-z0-9_']*)/g, kind: \"property\" },\n        { regex: /(?:^|\\n)\\s*([A-Za-z_][A-Za-z0-9_']*|\\([~!#$\\^&*?+:\\-.=<\\/>\\\\|]+\\))\\s*:(?!:)/g, kind: \"method\" },\n        { regex: /(?:^|\\n)\\s*(?:property\\s+)?((?!(?:new)?type)[A-Za-z_][A-Za-z0-9_']*|\\([~!#$\\^&*?+:\\-.=<\\/>\\\\|]+\\)).*=(?![>=])/g, kind: \"method2\" }\n    ]\n}\n"
                },
                {
                    "type": "runners",
                    "filename": "cryptol.run",
                    "data": "{\n    \"cmd\" : [\"cryptol\", \"$file\", \"$args\"],\n    \"info\" : \"$file loaded\",\n    \"env\" : {\n        \"PATH\": \"$project_path/cryptol/bin:$project_path/z3/bin\"\n    },\n    \"selector\" : \"source.cry\"\n}"
                },
                {
                    "type": "runners",
                    "filename": "cryptol_interactive.run",
                    "data": "{\n    \"cmd\" : [\"cryptol\", \"-b\", \"$file\", \"$args\"],\n    \"info\" : \"$file batch script executed\",\n    \"env\" : {\n        \"PATH\": \"$project_path/cryptol/bin:$project_path/z3/bin\"\n    },\n    \"selector\" : \"source.icry\"\n}"
                },
                {
                    "type": "snippets",
                    "filename": "cryptol.snippets",
                    "data": "# scope: cryptol\n\nsnippet function\n\t${1:fn} :\n\t    {${2:type_parameters}}\n\t    (${3:type_constraints}) =>\n\t    (${4:input_type} -> ${5:output_type})\n\t$1 ${6:input} = \n\t    ${0:output}\nsnippet if\n\tif ${1:pred1} then ${2:val1}\n\t | ${3:pred2} then ${4:val2}\n\telse ${0:0x0}\nsnippet \\\n\t\\\\${1:params} -> ${0:expr}\nsnippet import\n\timport ${0:Name}\nsnippet import_as\n\timport ${1:Name} as ${0:Alias}\nsnippet import_as_hiding\n\timport ${1:Name} as ${2:Alias} hiding (${3:symbols})\nsnippet import_as_list\n\timport ${1:Name} as ${2:Alias}(${0:symbols})\nsnippet import_hiding\n\timport ${1:Name} hiding (${0:symbols})\nsnippet import_list\n\timport ${1:Name}(${0:symbols})\nsnippet module\n\tmodule ${0:Name} where\nsnippet named_module_instantiation\n\tmodule ${1:Name} = ${0:Parent} where\nsnippet record\n\t{ ${1:k1} = ${2:v1}, \n\t  ${3:k2} = ${0:v2} }\nsnippet sequence\n\t[ ${1:v0}, ${0:v1} ]\nsnippet sequence_comprehension\n\t[ ${1:target}\n\t| ${2:var} <- ${0:seq} ]\nsnippet sequence_enumeration\n\t[ ${0:initialValue} .. ]\nsnippet sequence_infinite\n\t[ ${0:initialValue} ... ]\nsnippet sequence_infinite_step\n\t[ ${1:initialValue}, ${0:nextValue} ... ]\nsnippet sequence_interval\n\t[ ${1:initialValue} .. ${0:finalValue} ]\nsnippet sequence_step\n\t[ ${1:initialValue}, ${0:nextValue} .. ]\nsnippet sequence_step_interval\n\t[ ${1:initialValue}, ${2:nextValue} .. ${0:finalValue} ]\nsnippet tuple\n\t( ${1:v0}, ${0:v1} )\nsnippet type\n\ttype ${1:Name} ${2:vars} = ${0:Signature}\nsnippet type_constraint\n\ttype constraint ${1:Name} ${2:vars} = (${0:constraints})\nsnippet where\n\twhere \n\t  ${0:expr}\n"
                },
                {
                    "type": "templates",
                    "filename": "cryptol.templates",
                    "data": "filename .cry\nsection General\ncaption Cryptol module\n    module MyModule where\nfilename .icry\nsection General\ncaption Cryptol script\n    :l MyModule"
                }
            ].forEach(function(x) {
                debug.addStaticPlugin(x.type, "c9.ide.language.cryptol", x.filename, x.data, plugin);
            });
        });
        
        plugin.load("c9.ide.language.cryptol.bundle");
        
        register(null, {});
    }
});
