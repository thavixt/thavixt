# @thavixt/scrollbar-react

[![npm package](https://img.shields.io/npm/v/@thavixt/scrollbar-react)](https://www.npmjs.com/package/@thavixt/scrollbar-react)
![NPM Downloads](https://img.shields.io/npm/dm/@thavixt/scrollbar-react)
![last update](https://img.shields.io/npm/last-update/@thavixt/scrollbar-react)
[![CI](https://github.com/thavixt/thavixt/actions/workflows/thavixt.yml/badge.svg)](https://github.com/thavixt/thavixt/actions/workflows/thavixt.yml)

A Typescript package for React to customize scrollbars on your website.

## Demo

[demo page](https://thavixt-scrollbar.komlosidev.net/)

## Install

```bash
npm install @thavixt/scrollbar-react
```

## Example

```ts
import { useScrollbar } from '@thavixt/scrollbar-react';

function MyCompontent() {
	// use the provided hook to create a ref to the element you want to customize
	const ref = useScrollbar<HTMLDivElement>({
		onScrollToEnd: (directions) => {
			console.log(`you reached the ${directions.join(',')} end`);
		},
		styles: {
			thumbColor: '#999',
			thumbHoverColor: '#ccc',
			trackColor: 'transparent',
		},
	})

	// to apply styles to *all* elements on your site, omit using the returned `ref`
	/*
	useScrollbar<HTMLDivElement>({
		body: true,
		styles: {
			thumbColor: '#999',
		},
	})
	*/

	return (
		<div ref={ref} className='h-[300px] overflow-auto whitespace-pre'>
			my very long text that overflows
		</div>
	)
}
```

## API

### useThavixtScrollbar(options?): ref

#### options

Type: `object`

```ts
type ThavixtScrollbarOptions = {
	// Callback on scroll
	onScroll?: (details: ScrollbarScrollDetails) => void;
	// Callback when the element is scrolled to it's min/max width/height
	onScrollToEnd?: (directions: ScrollDirection[]) => void;
	// Styles to apply to the element's vertical/horizontal scrollbar
	styles?: ScrollbarStyles;
	// Apply to all scrollbars on the page
	body?: boolean;
};

interface ScrollbarStyles {
	// Border radius
	borderRadius?: number;

	// Dimensions
	width?: number;
	height?: number;

	// Light theme colors
	thumbColor?: string;
	thumbHoverColor?: string;
	trackColor?: string;
	
	// Dark theme colors
	thumbColorDark?: string;
	thumbHoverColorDark?: string;
	trackColorDark?: string;
}

type ScrollDirection = "top" | "bottom" | "left" | "right";
type ScrollbarScrollDetails = Record<ScrollDirection, number>;
```

#### ref

Type: `React.Ref<T>`

> In case of `options: { body: true }`, the returned `ref` always points to `document.body`. This `ref` should not be assigned to an element.
