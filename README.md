# c9.ide.language.cryptol

This is an experimental [Cloud9 IDE](https://c9.io) plugin for 
[Cryptol](https://cryptol.net), a domain-specific language for cryptography.

## Prerequisites

This plugin works with the [legacy](https://c9.io) or
[AWS](https://aws.amazon.com/cloud9) Cloud9 IDE.

## Installation

Instructions for loading Cloud9 plugins are provided in [this Cloud9 community
post](https://community.c9.io/t/distributing-and-installing-custom-cloud9-plugins/15168).
As this experimental plugin has not yet been published to a CDN, it can be
installed locally:

  1. Upload this top-level `/cryptol` plugin folder into `~/.c9/plugins`.

  2. Add `package.json` to the arguments of `services.pluginManager.loadPackage`
     in the initialization script:

     ```JavaScript
       services.pluginManager.loadPackage([
         "~/.c9/plugins/cryptol/package.json",
         // ...
       ]);
     ```

  3. Save the initialization script and commit changes, e.g. by pressing
     `Ctrl-Enter` or reloading the page.

## Usage

This plugin provides the following features:
  * [Syntax Highlighting](https://cloud9-sdk.readme.io/docs/highlighting-rules)
  * [Runners](https://cloud9-sdk.readme.io/docs/runners)
  * [Outline](https://cloud9-sdk.readme.io/docs/outline)
  * [Snippets](https://cloud9-sdk.readme.io/docs/snippets)
  * [Templates](https://cloud9-sdk.readme.io/docs/templates)

### Syntax Highlighting

This plugin assigns different types to various Cryptol tokens (e.g. keywords,
numerics, operators, strings, Prelude symbols, user-defined symbols), which
the Cloud9 editor highlights with different colors according to the current
[theme](https://cloud9-sdk.readme.io/docs/themes). Types are somewhat consistent
with [TextMate language grammars](https://manual.macromates.com/en/language_grammars).

Syntax highlighting is automatically triggered when opening a Cryptol module
(`.cry`) or batch file (`.icry`). To apply Cryptol highlighting to a file with
another extension, invoke the `View > Syntax > Cryptol` menu sequence.

### Runners

This plugin introduces run configurations for Cryptol modules (`.cry`) and batch
files (`.icry`), which can be launched automatically by clicking the `Run`
button, or explicitly via the `Run > Run With > Cryptol.run` (or
`Cryptol_interactive.run`) menu sequence. Nested modules require changing the
current working directory of the runner to the module's root folder, e.g. via
the `CWD` tab in the launched terminal pane or a custom
[run configuration](https://docs.c9.io/docs/running-and-debugging-code).

### Outline

This plugin assigns Cryptol tokens to Cloud9 outline types as follows:
  * module -> package
  * import -> package
  * type (constraint) -> property
  * symbol -> method
  * property -> method2

The result is a flat view of a hierarchy of symbol definitions, including those
inside `where` clauses of other definitions, which is arguably better (or worse)
than nothing.  The Outline view can be toggled by clicking on the `Outline` tab
in the navigation menu to the right.

### Snippets

This plugin supports autocompletion of named code snippets, which can be
displayed via the configured key sequence for autocompletion (typically
`Ctrl-Space`).  For example, the user can type `if<Ctrl-Space>` to insert an
if-then-else-with-multiway snippet.  Snippets are filtered by prefix but not
by validity.

### Templates

The plugin includes very basic templates for new Cryptol modules or interactive
scripts, which can be created via the `File > New from template > Cryptol module`
(or `Cryptol script`) menu sequence.

## Tests

This plugin does not have any automated tests...yet. It has been used with a
variety of examples and test cases from the author as well as those included in
the [Cryptol](https://github.com/GaloisInc/cryptol) repository. In most cases,
it behaves helpfully, if not always *correctly*.

## Built With

* [Cloud9 SDK](https://cloud9-sdk.readme.io/docs) - Cloud9's plugin API

## Contributing

The author welcomes contributions (by way of pull requests or issues) from those
interested in Cryptol and/or language tooling.

## Authors

* *Initial work* - [WeeknightMVP](https://github.com/WeeknightMVP)

See also the list of any
[contributors](https://github.com/WeeknightMVP/c9.ide.language.cryptol/contributors)
who have participated in this project.

## License

This project is licensed under the 3-Clause BSD License - see the
[LICENSE.md](LICENSE.md) file for details.
