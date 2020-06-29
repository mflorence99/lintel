## 0.0.1

* Initial release

## 1.0.0

Switching out of pre-release status. Most changes are visible in an improved UI for the ESLint Config page.

* Better use of semantic HTML tags #1
* Plugin extensions are not resolved recursively #2
* Highlight settings that are inherited on the ESLint config page #3
* Upgrade to Angular 10 #4
* Yes, of course we can support .cjs files #5
* Change of plugin doesn't trigger recalc of extension #6
* Handle markdown rule descriptions, as in lodash #7

## 1.0.2

We gave up on trying to build a UI for custom parser options. There's no schema for them so we can't do it reliably. A button is now shown to edit them manually. All planned refactoring is complete.

This patch release closes issues #9 and #10.

## 1.0.3

Lintel now supports [Shared Configurations](https://eslint.org/docs/developer-guide/shareable-configs).

This patch release closes out issue #11.

## 1.0.4

[Alex Rafter](https://github.com/Alex-Rafter) very helpfully pointed out that Lintel does not properly handle Windows paths in the UI. It expects to break and shorten file names by a `/` and not also a `\`.

This patch closes out issue #14.
