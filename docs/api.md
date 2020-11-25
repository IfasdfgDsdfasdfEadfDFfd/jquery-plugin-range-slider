# Plugin API.

_In all examples we use `api` as placeholder for PluginApi object_

- setLeftValue(value as number)

```javascript
// good
api.setLeftValue(3);
api.setLeftValue(-3);
api.setLeftValue(3.14);

// bad
api.setLeftValue({});
api.setLeftValue('3');
```

- setRightValue(value as number)

Will be set left thumb position according range slider

```javascript
// good
api.setRightValue(3);
api.setRightValue(-3);
api.setRightValue(3.14);

// bad
api.setRightValue({});
api.setRightValue('3');
```

- setMax(value as number)

Max value always be multiplier of `step` property

```javascript
// good
api.setMax(3);
api.setMax(-3);
api.setMax(3.14);

// bad
api.setMax({});
api.setMax('3');
```

- setMin(value as number)

min value always be multiplier of `step` property

```javascript
// good
api.setMin(3);
api.setMin(-3);
api.setMin(3.14);

// bad
api.setMin({});
api.setMin('3');
```

- setStep(value as number)

step should be always greater that 0

```javascript
// good
api.setStep(1);
api.setStep(0.5);

// bad
api.setStep(0);
api.setStep(-1);
api.setStep('1');
```

- setFixedValues(values as array of strings)

Use strong defined values instead of generated range of numbers

```javascript
// good
api.setFixedValues(['10', '100', '1000']);
api.setFixedValues(['april', 'may', 'june']);

// bad
api.setFixedValues(10, 100, 1000);
```

- setPrefix(value as string or callback that return string)

Add prefix to all your values receive `value` as argument

```javascript
// good
api.setPrefix('$');
api.setPrefix(value => {
  if (value > 10) {
    return '₽';
  } else {
    // don't forget for either case
    return '';
  }
});

// bad
api.setPrefix(value => {
  return Number();
});

api.setPrefix(value => {
  if (value === 0) return '??';
  // what if `value` don't equal zero?
});
```

- setPostfix(value as string or callback that return string)

Add Postfix to all your values receive `value` as argument

```javascript
// good
api.setPostfix('$');
api.setPostfix(value => {
  if (value > 10) {
    return '₽';
  } else {
    // don't forget for either case
    return '';
  }
});

// bad
api.setPostfix(value => {
  return Number();
});

api.setPostfix(value => {
  if (value === 0) return '??';
  // what if `value` don't equal zero?
});
```

- setOrientVertical(value as boolean)

If `true` display slider vertical

```javascript
api.setOrientVertical(true); // vertical;
api.setOrientVertical(false); // horizontal;
```

- setIntervalMode(value as boolean)

If `true` display both range slider thumbs either only right

```javascript
api.setIntervalMode(true); // from min value to right;
api.setIntervalMode(false); // from left value to right value;
```

- setMarkerVisibility(value as boolean)

If `true` display marker under range slider thumb

```javascript
api.setMarkerVisibility(true); // show;
api.setMarkerVisibility(false); // hide;
```

- setTrackScaleVisibility(value as boolean)

If `true` display track scale

```javascript
api.setTrackScaleVisibility(true); // show;
api.setTrackScaleVisibility(false); // hide;
```

- setPrimaryColor(value as string)

Value should be valid hex color string either way use prevision defined color

```javascript
// good
api.setPrimaryColor('#000');

// bad
api.setPrimaryColor('black');
```
