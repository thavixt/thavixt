import { DEFAULT_STYLES, ScrollbarStyles } from "@thavixt/scrollbar-core";

export function getCodeReactHook(styles: ScrollbarStyles, placeholderCount: number) {
	return `import { useRef } from "react";
import { useScrollbar } from "@thavixt/scrollbar-react";

function MyCompontent() {
	const ref = useScrollbar({
		thumbColor: '${styles.thumbColor}',
		thumbColorDark: '${styles.thumbColorDark}',
		trackColor: '${styles.trackColor}',
		trackColorDark: '${styles.trackColorDark}',
	});

	return (
		<div ref={ref} className='h-[300px] overflow-auto whitespace-pre'>
			Lorem ipsum dolor sit amet...x${placeholderCount}
		</div>
	)
}`;
};

export const styleDescriptions: Record<keyof ScrollbarStyles, string> = {
	thumbColor: 'color of the scrollbar thumb you drag when scrolling (CSS color)',
	thumbColorDark: 'color of the scrollbar thumb you drag when scrolling (CSS color)',
	trackColor: 'color of the scrollbar track (CSS color)',
	trackColorDark: 'color of the scrollbar track (CSS color)',
}

export const demoStyles: ScrollbarStyles = {
	...DEFAULT_STYLES,
	thumbColor: '#EE6820',
	thumbColorDark: '#7D3497',
	trackColor: '#CDCDCD',
	trackColorDark: '#232323',
}

export const demoGradientStyles: ScrollbarStyles = {
	...DEFAULT_STYLES,
	thumbColor: 'radial-gradient(circle, rgba(45,157,253,1) 0%, rgba(195,34,45,1) 100%)',
	thumbColorDark: 'radial-gradient(circle, rgba(253,156,45,1) 0%, rgba(34,195,180,1) 100%)',
	trackColor: 'linear-gradient(0deg, rgba(253,187,45,1) 0%, rgba(34,193,195,1) 100%)',
	trackColorDark: 'linear-gradient(180deg, rgba(224,69,137,0) 0%, rgba(161,81,251,1) 100%)',
}

export const numericScrollbarStyles: string[] = [];

export const sytaxHighlighterStyle = { maxHeight: 250, overflow: "auto", padding: '2px 4px', fontSize: 12 };

export const lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nihil quasi enim, harum, delectus vero ipsa hic, animi aliquam numquam consequatur adipisci vel nemo tempore maiores eveniet nesciunt! Perferendis, molestias neque? Et quo maxime id consequuntur sequi officia, libero est itaque hic doloribus expedita repellat in provident facilis rem inventore, modi odit vitae atque error!`;
export const getText = (count: number) => new Array(count).fill(lorem).join("\n");

export const globalCode = `/**
* If you provide the second argument 'applyToBody' as true,
* *all* scrollbars on the page will be affected.
*
* When doing this, the 'useScrollbar' hook will *not* have a return value.
* Since the styling is done with CSS, all elements created after the fact
* will have the scrollbar styles applied.
**/
useScrollbar({ styles, onScrollToEnd }, true);
`;

export const importUnpkgCoreCode = `import Scrollbar from 'https://unpkg.com/@thavixt/scrollbar-core/dist/index.js';
// see usage examples below`;
