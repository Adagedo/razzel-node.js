# razzle-plugin-scss

This package contains a plugin for using [SCSS/SASS](https://sass-lang.com/) with Razzle

## Usage in Razzle Projects

```bash
yarn add razzle-plugin-scss --dev
```

### With the default options

```js
// razzle.config.js

module.exports = {
  plugins: ['scss'],
};
```

Files with an ending in the name _.module.scss and _.module.sass will load as cssModules

example:

```jsx
import s from './myfile.module.scss';
```

---

### With custom options

```js
// razzle.config.js

module.exports = {
  plugins: [
    {
      name: 'scss',
      options: {
        postcss: {
          dev: {
            sourceMap: false,
          },
        },
      },
    },
  ],
};
```

## Options

Please remember that custom options will extends default options using `Object.assign`.
Array such as postcss.plugins **WILL NOT BE EXTENDED OR CONCATED**, it will override all default plugins.

---

### postcss

default

```js
{
  dev: {
    sourceMap: true,
    ident: 'postcss',
  },
  prod: {
    sourceMap: false,
    ident: 'postcss',
  },
  plugins: [
    PostCssFlexBugFixes,
    autoprefixer({
      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      flexbox: 'no-2009',
    }),
  ],
}
```

Set `dev` to add config to postcss in `development`.
Set `prod` to add config to postcss in `production`.

See [postcss loader options](https://github.com/postcss/postcss-loader#options) to override configs.

---

### sass

default

```js
{
  dev: {
    sassOptions: {
      sourceMap: true,
      includePaths: [paths.appNodeModules],
    },
  },
  prod: {
    sassOptions: {
      sourceMap: true,
      sourceMapContents: false,
      includePaths: [paths.appNodeModules],
    },
  },
},
```

Set `dev` to add config to postcss in `development`.
Set `prod` to add config to postcss in `production`.

See [node-sass options](https://github.com/sass/node-sass#options) to override configs.

---

### css

default

```js
{
  dev: {
    sourceMap: true,
    importLoaders: 1,
    modules: {
      auto: true,
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
  },
  prod: {
    sourceMap: razzleOptions.enableSourceMaps,
    importLoaders: 1,
    modules: {
      auto: true,
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
  },
},
```

Set `dev` to add config to postcss in `development`.
Set `prod` to add config to postcss in `production`.

See [css loader options](https://github.com/webpack-contrib/css-loader#options) to override configs.

---

#### style

default

```js
{
}
```

Style loader only used in `development` environment.

See [style loader options](https://github.com/webpack-contrib/style-loader#options) to override configs.

#### resolveUrl

default

```js
{
  dev: {},
  prod: {},
}
```

Set `dev` to add config to postcss in `development`.
Set `prod` to add config to postcss in `production`.

See [resolve url loader options](https://github.com/bholloway/resolve-url-loader#options) to override configs.
