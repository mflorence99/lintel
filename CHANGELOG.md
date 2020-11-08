# Change Log

## 1.3.1

Thanks to @jerone, fixes to #23 and #25.

## 1.3.0

Upgraded to ESLint v7, now that the Vue plugin has removed its peer dependency on v6. This release closes issue #13.

## 1.2.1

Improved use of semantic tags, especially `<abbr>` and `<cite>`.

## 1.2.0

The Lintel code has been refactored for significantly better performance.

## 1.1.3

Based on some well-considered feedback, this release adopts a much more conservative implementation of the 'show inherited rules' feature, as triggered by the 'eye' icon.

When inherited rules are hidden, Lintel will now _only_ show those rules that are directly defined in the `.eslintrc` file under analysis. Those rules will be partitioned by plugin (via tabs on top) and by category (via menu items in the sidebar) just as normal, but _only_ those plugins and categories that are being directly used are listed.

## 1.1.2

- Inherited rules for overrides calculated incorrectly #18
- Unknown category does not account for rules that actually exist, but for which no plugin is defined or inherited #19
- When switching to a new file, try to preserve selected plugin #20
- When category or plugin can't be found, switch to base #21

## 1.1.1

- Minor performance improvements
- No longer opening with ESLint Config #17

## 1.1.0

- Lintel now fully supports overrides
- The sections on the config page have been ordered alphabetically to make them easier to find
- When the Inherited Rules filter is "off", Active Rules shows only the plugins that actually have rules coded in the configuration. This makes it much easier to see just the rules defined.

This patch closes out issue #12.

## 1.0.4

[Alex Rafter](https://github.com/Alex-Rafter) very helpfully pointed out that Lintel does not properly handle Windows paths in the UI. It expects to break and shorten file names by a `/` and not also a `\`.

This patch closes out issue #14.

## 1.0.3

Lintel now supports [Shared Configurations](https://eslint.org/docs/developer-guide/shareable-configs).

This patch release closes out issue #11.

## 1.0.2

We gave up on trying to build a UI for custom parser options. There's no schema for them so we can't do it reliably. A button is now shown to edit them manually. All planned refactoring is complete.

This patch release closes issues #9 and #10.

## 1.0.0

Switching out of pre-release status. Most changes are visible in an improved UI for the ESLint Config page.

- Better use of semantic HTML tags #1
- Plugin extensions are not resolved recursively #2
- Highlight settings that are inherited on the ESLint config page #3
- Upgrade to Angular 10 #4
- Yes, of course we can support .cjs files #5
- Change of plugin doesn't trigger recalc of extension #6
- Handle markdown rule descriptions, as in lodash #7

## 0.0.1

- Initial release
