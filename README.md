# JQuery plugin Range Slider

## About

Simple range slider with minimalistic design and fully featured api that allow you to:

- update every value you see
- switch between interval and single modes
- set prefix and postfix
- set your own list of data
- support vertical and horizontal layout

## Usage

After installation you need to import plugin

```javascript
import 'jquery-plugin-range-slider';
```

or if you prefer commonjs syntax

```javascript
require('jquery-plugin-range-slider');
```

now you can select an element that you want to be a container for range-slider

```javascript
$('#container-for-range-slider').rangeSlider({
  min, // @number, start point for range slider
  max, // @number, end point for range slider
  step, // @number, step between two point of range slider track
  from, // @number, when intervalMode enabled it will be value for left thumb else can be passed
  to, // @number, default value for range slider thumb
  values, // @Array<string|number>, (default []), fixed values list, can be passed
  prefix, // @string or function(value as number) => string
  postfix, // @string or function(value as number) => string
  vertical, // @boolean (default false), switch to vertical layout
  intervalMode, // @boolean (default true), enable interval mode, two thumbs will be displayed
  markerVisibility, // @boolean (default true), should be thumb markers displayed?
  trackScaleVisibility, // @boolean (default true), should be track scale displayed?
  color, // @string (default #1565c0), hex primary color value
});
```

that call return api object, for more information about it see [Api documentation](https://unpredictable-username.github.io/jquery-plugin-range-slider/api.html).

## Development

### Setup:

first of all needs to install dependencies by running:

```bash
npm install
```

or

```bash
yarn
```

### Create production build:

`(npm|yarn) run prod`

compile project into minimized bundle with example index.html page located in dist folder.

### Start development server:

`(npm|yarn) run dev`

start webpack-dev-server with live reloading on localhost:8080.

### Run unit test:

`(npm|yarn) run test`

run jest (Testing framework) in watch mode.

### Get test coverage:

`(npm|yarn) run coverage`

run jest (Testing framework) coverage.

### Lint typescript:

`(npm|yarn) run lint:ts`

run eslint for ts files located in src folder, run command with --fix postfix if you want auto fix some appeared problems.

### Lint scss:

`(npm|yarn) run lint:scss`

run stylelint for scss files locate in src folder, run command with --fix postfix if you want auto fix some appeared problems.

### Run prettier:

`(npm|yarn) run prettify`

run prettier in write mode for all supported file types into ./src folder.

## Architecture

This plugin implements classic [MVC design pattern](https://www.geeksforgeeks.org/mvc-design-pattern/) with some updates. So we have Model which presented as [Redux-like](https://redux.js.org/introduction/getting-started) store, [View](https://unpredictable-username.github.io/jquery-plugin-range-slider/view.html) class that contain HTMLElements and manipulate DOM and Controller called as [Provider](https://unpredictable-username.github.io/jquery-plugin-range-slider/provider.html) here and can pass data from [Store](https://unpredictable-username.github.io/jquery-plugin-range-slider/store.html) (Model) to View and into backward direction from View (that in its turn from DOM events) into Store by dispatching some Actions.

For detailed view see [documentation](https://unpredictable-username.github.io/jquery-plugin-range-slider/).

## Licence

Licensed under the MIT license.
