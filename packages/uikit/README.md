# @thavixt/uikit

[![npm package](https://img.shields.io/npm/v/@thavixt/uikit)](https://www.npmjs.com/package/@thavixt/uikit)
 
![Bundle size - minified](https://img.shields.io/bundlephobia/min/%40thavixt%2Fuikit)

<!-- ![Downloads](https://img.shields.io/npm/dm/@thavixt/uikit) -->

![last updated](https://img.shields.io/npm/last-update/@thavixt/uikit)

[![Pipeline](https://github.com/thavixt/thavixt/actions/workflows/thavixt.yml/badge.svg)](https://github.com/thavixt/thavixt/actions/workflows/thavixt.yml)

[![Website deployment](https://github.com/thavixt/thavixt/actions/workflows/deploy.yml/badge.svg)](https://github.com/thavixt/thavixt/actions/workflows/deploy.yml)

## Installation

```shell
npm install @thavixt/uikit
```

> **Important:** this library uses the default classnames and utilities provided by [TailwindCSS](https://tailwindcss.com/).

## Usage

Visit the [Storybook](https://thavixt-uikit-storybook.komlosidev.net/) to view all available components with examples.

An example of using the `<Button/>` component would look something like this:

```tsx
import {Button} from '@thavixt/uikit';

export function MyComponent() {
  return (
    <Button variant="secondary" onClick={() => console.log('you clicked the button!')}>
      Perform important task
    </Button>
  )
}
```

If you are not using TailwindCSS in your app, you can import the prebuilt styles used by the library directly:

```ts
/* main.tsx */

// in your root React component
import '@thavixt/uikit/dist/index.css';
```

or

```css
/* index.css */

/* in your root stylesheet */
@import "~@thavixt/uikit/dist/index.css";
/* or */
@import "node_modules/@thavixt/uikit/dist/index.css";
```

## Inspiration

- [Open UI](https://open-ui.org/)