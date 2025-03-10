# @thavixt/uikit

![npm package](https://img.shields.io/npm/v/@thavixt/uikit)

![downloads](https://img.shields.io/npm/dm/@thavixt/uikit)

![last updated](https://img.shields.io/npm/last-update/@thavixt/uikit)
 
[Storybook](https://master--67cf40d1309edccd81c8a1fe.chromatic.com/)
 
## Installation

```shell
npm install @thavixt/uikit
```

> **Important:** this library uses the default classnames and utilities provided by [TailwindCSS](https://tailwindcss.com/).

## Usage

Visit the [Storybook](https://thavixt-uikit.komlosidev.net/) to view all available components with examples.

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

In case you do not use TailwindCSS for your app, you can import the prebuilt styles used by the library directly:

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