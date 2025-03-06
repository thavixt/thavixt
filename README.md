# @thavixt/uikit

![npm package](https://img.shields.io/npm/v/@thavixt/uikit)

![downloads](https://img.shields.io/npm/dm/@thavixt/uikit)

![last updated](https://img.shields.io/npm/last-update/@thavixt/uikit)

## Installation

```shell
npm install @thavixt/uikit
```

> **Important:** This library depends on `tailwind`'s default classes.
>
> For this lib to work, make sure you have [Tailwind CSS](https://tailwindcss.com/) installed.

## Usage

Visit the [Storybook](https://thavixt-uikit.komlosidev.net/) to view all available components with examples.

```tsx
import {Button} from '@thavixt/uikit';

export function ExampleComponent() {
  return (
    <div>
      <Button onClick={() => console.log('you clicked the button')}>
        Hello world!
      </Button>
    </div>
  )
}
```

## Notes

- run one specific Cypress spec with
```bash
npm run cyct:spec --spec=SomeComponent
```