[![NPM](https://nodei.co/npm-dl/react-native-keyboard-spacer.png?months=3&height=2)](https://nodei.co/npm/react-native-keyboard-spacer/)

# react-native-keyboard-spacer

Plug and play iOS react-native keyboard spacer view.

![image](https://media.giphy.com/media/3oEjHJwLyYg7upTyYo/giphy.gif)
## Quick Start

Install View: `npm install --save react-native-keyboard-spacer`

## Example Usage

The view will automatically perform a layout animation when the keyboard appears or disappears.

```javascript
import KeyboardSpacer from 'react-native-keyboard-spacer';
import React from 'react';
import { View, TextInput } from 'react-native';

const MyComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <TextInput 
        style={{ height: 45 }}
        placeholder="Enter your text"
      />
      <KeyboardSpacer />
    </View>
  );
};
```

### Properties

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| topSpacing | number | 0 | Add or subtract additional spacing from keyboard height |
| onToggle | (isKeyboardOpen: boolean, keyboardSpace: number) => void | () => undefined | Called when keyboard toggles with keyboard state and space height |
| style | ViewStyle | undefined | Custom styles for the keyboard spacer view |
