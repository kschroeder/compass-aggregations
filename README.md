# compass-aggregations [![][travis_img]][travis_url] [![][storybook_img]][storybook_url]

> Compass Plugin for the MongoDB Aggregation Pipeline Builder.

[![](https://docs.mongodb.com/compass/master/_images/agg-builder-export-dropdown.png)](https://docs.mongodb.com/compass/master/aggregation-pipeline-builder/)

## Code Tour

- `src/components/aggregations` The primary export is connected component
- `src/modules/` is where action happens
    - action creators components call
    - reducers that call dataService, window.open, emit to other plugins, etc.
    - follows the `ducks` pattern
- `src/stores/store` is where plugin listens+responds to events of interest from other plugins
- store is global state instantiated via `configureStore()`
- All tests are local to their module e.g. `src/*/<module>.spec.js`

### Note: Cross-plugin Communication

> How does clicking on export to language button in aggregation builder show the modal that has code in it?

The aggregation builder in Compass actually involves 2 Compass plugins:

- [`<Aggregation />`](https://github.com/mongodb-js/compass-aggregations) Plugin for primary UI
- [`<ExportToLanguage />`](https://github.com/mongodb-js/compass-export-to-language) Modal plugin that connects `<Aggregation />` to `bson-transpilers` [for actual compiling to another language](https://github.com/mongodb-js/bson-transpilers)

Here's how these 2 plugins come together:

- `./src/modules/export-to-language.js` `appRegistry.emit('open-aggregation-export-to-language', generatePipelineAsString())`
- [`compass-export-to-language/src/stores/store.js`](https://github.com/mongodb-js/compass-export-to-language/blob/master/src/stores/store.js#L16) Listener for 'export to lang' event via appRegistry and renders its modal.
- [`compass-export-to-language/src/modules/export-query.js`](https://github.com/mongodb-js/compass-export-to-language/blob/master/src/modules/export-query.js#L56) has reducer for calling `bson-transpilers.compile()` which populates the code in the modal dialog.

### Usage with a `mongodb-data-service` Provider

See `./examples-data-service-provider.js` for details on what `data-service` functions are used and the applicable options for each.

## Examples

These are a base set of example aggregation's from @terakilobyte used in his M121 agg framework university course. These provide canonical, real-world references of various complexity for us to design/test against. The underlying source datasets are in Atlas and connected to a Stitch app (see [`examples/data-service-provider.js`](https://github.com/mongodb-js/compass-aggregations/blob/master/examples/data-service-provider.js)).

### Basic

[`example-basic.js`](https://github.com/mongodb-js/compass-aggregations/blob/master/examples/example-basic.js) is a simple `$match` and `$count`.

[View in storybook](https://mongodb-js.github.io/compass-aggregations/?path=/story/examples--basic)

### Array Stats

[`example-array-stats.js`](https://github.com/mongodb-js/compass-aggregations/blob/master/examples/example-array-stats.js) uses `$project` of accumulators to generate summary statistics 

[View in storybook](https://mongodb-js.github.io/compass-aggregations/?path=/story/examples--array-stats)

### Grouped Stats

[`example-grouped-stats.js`](https://github.com/mongodb-js/compass-aggregations/blob/master/examples/example-grouped-stats.js) uses `$match` and `$group` to achieve the same goal as `example-array-stats.js`

[View in storybook](https://mongodb-js.github.io/compass-aggregations/?path=/story/examples--grouped-stats)

### Schema Checker

[`example-complex.js`](https://github.com/mongodb-js/compass-aggregations/blob/master/examples/example-schema-checker.js) uses `$lookup` and more to sanity check mistyped names or bad references.

[View in storybook](https://mongodb-js.github.io/compass-aggregations/?path=/story/examples--schema-chcker)

### Pearson's rho

[`example-pearsons-rho.js`](https://github.com/mongodb-js/compass-aggregations/blob/master/examples/example-pearsons-rho.js) calculates [the correlation co-efficient of two fields using Pearsons Rho](http://ilearnasigoalong.blogspot.com/2017/10/calculating-correlation-inside-mongodb.html). (HT @johnlpage)

[View in storybook](https://mongodb-js.github.io/compass-aggregations/?path=/story/examples--pearsons-rho)

### Registering Examples

See [`aggregations.stories.js`](https://github.com/mongodb-js/compass-aggregations/blob/master/examples/aggregations.stories.js).

### Adding new examples

1. [Put your data set in MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new Stitch app with read permissions for the example collection
3. Copy `./example-grouped-stats.js` to `./example-<my-example>.js` and update with your pipeline details and `stitchAppId`
4. In [`aggregations.stories.js`](https://github.com/mongodb-js/compass-aggregations/blob/master/examples/aggregations.stories.js) `import MY_EXAMPLE from ./example-<my-example>.js` and add a new story
5. `npm run storybook` and your new example will load
6. Open a new pull request with your changes and include a brief description of what you use this aggregation pipeline for.


## Contributing

If you're interested in helping with the Aggregation Builder plugin, we'd be over the moon excited! Here are a few ideas if you're interested but not sure where to start:

- [Add a new example aggregation](https://github.com/mongodb-js/compass-aggregations/tree/master/examples#adding-new-examples)
- Additions/clarifications/improvements to `README`'s
- More tests (especially edge cases!)
- Generate `jsdoc` html to include in GitHub pages
- Improve build times (e.g. audit our webpack configs)

## Related

- [`<ExportToLanguage />`](https://github.com/mongodb-js/compass-export-to-language) Modal plugin that connects `<Aggregation />` to `bson-transpilers` [for actual compiling to another language](https://github.com/mongodb-js/bson-transpilers)
- [`mongodb-js/stage-validator`](https://github.com/mongodb-js/stage-validator) Aggregation Pipeline Stage grammar.
- [`bson-transpilers`](https://github.com/mongodb-js/bson-transpilers) Read the amazing: [Compiler in JavaScript using ANTLR](https://medium.com/dailyjs/compiler-in-javascript-using-antlr-9ec53fd2780f)
- [`mongodb-js/ace-mode`](https://github.com/mongodb-js/ace-mode) MongoDB highlighting rules for ACE.
- [`mongodb-js/ace-theme`](https://github.com/mongodb-js/ace-theme) MongoDB syntax highlighting rules for ACE.
- [`mongodb-js/ace-autocompleter`](https://github.com/mongodb-js/ace-autocompleter) Makes ACE autocompletion aware of MongoDB Aggregation Pipeline [operators, expressions, and fields](https://github.com/mongodb-js/ace-autocompleter/tree/master/lib/constants).


## Development

### Tests

```
npm run test
```

### Electron

```
npm start
```

### Storybook

```
npm run storybook
```

### Analyze Build

```
npm run analyze
```

## License

Apache 2.0

[travis_img]: https://travis-ci.org/mongodb-js/compass-aggregations.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/compass-aggregations
[storybook_img]: https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg
[storybook_url]: https://mongodb-js.github.io/compass-aggregations/

## TODO

- [x] Verify Storybook not included in `production` bundle for Cloud
- [x] Switch Storybook deploy from `3.0.0` to `master`
- [x] Webpack 4 Upgrade #79 
- [x] Webpack 4 upgrade part 2 mongodb-js/compass-plugin#23
- [x] Fixed: Far too little docs for the amount of work...
- [ ] COMPASS-2888: Autocompletion includes projections #76
- [x] ~COMPASS-2960: Autocomplete `$$variables` defined from `let`~
- [ ] COMPASS-3086: Quickly create new pipelines by pasting into stage editor when in `INITIAL_STATE`

#### Misc

- [ ] input-docs uses sample size setting

#### Future

- [ ] Write some more tests for saving
- [ ] Save pipeline validation
