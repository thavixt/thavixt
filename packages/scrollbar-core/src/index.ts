export type ScrollDirection = "top" | "bottom" | "left" | "right";
export type ScrollbarScrollDetails = Record<ScrollDirection, number>;

type ScrollbarThresholdsReached = Partial<
	Record<ScrollDirection, boolean>
>;

export type ScrollbarOptions = {
	// Callback on scroll
	onScroll?: (details: ScrollbarScrollDetails) => void;
	// Callback when the element is scrolled to it's min/max width/height
	onScrollToEnd?: (directions: ScrollDirection[]) => void;
	// Styles to apply to the element's vertical/horizontal scrollbar
	styles?: ScrollbarStyles;
};

export type ScrollbarStyles = {
	// Light theme colors
	thumbColor?: string;
	trackColor?: string;
	// Dark theme colors
	thumbColorDark?: string;
	trackColorDark?: string;
};

const DEFAULT_THUMB_COLOR = "rgb(139, 139, 139)";
const DEFAULT_THUMB_COLOR_DARK = "rgb(139, 139, 139)";
const DEFAULT_TRACK_COLOR = "rgba(0, 0, 0, 0)";
const DEFAULT_TRACK_COLOR_DARK = "rgba(0, 0, 0, 0)";

export const DEFAULT_STYLES: Required<ScrollbarStyles> = {
	// Light theme colors
	thumbColor: DEFAULT_THUMB_COLOR,
	trackColor: DEFAULT_TRACK_COLOR,
	// Dark theme colors
	thumbColorDark: DEFAULT_THUMB_COLOR_DARK,
	trackColorDark: DEFAULT_TRACK_COLOR_DARK,
}

const createScrollbarStyles = (
	id: string | null,
	styles: ScrollbarStyles = {},
): string => {
	const elementSelector = id ? `[data-tsb-id="${id}"]` : `*`;
	// light colors
	const thumbColor = styles.thumbColor ?? DEFAULT_THUMB_COLOR;
	const trackColor = styles.trackColor ?? DEFAULT_TRACK_COLOR;
	// dark colors
	const thumbColorDark = styles.thumbColorDark ?? DEFAULT_THUMB_COLOR_DARK;
	const trackColorDark = styles.trackColorDark ?? DEFAULT_TRACK_COLOR_DARK;

	const variables = `/* Variables */
/* default/light theme colors */
${elementSelector} {
	--tsb_thumbColor: ${thumbColor};
	--tsb_trackColor: ${trackColor};
}
/* dark theme colors */
/* browser media query */
@media (prefers-color-scheme: dark) {
	/* data attribute switch, like Tailwind */
	:root[data-theme="light"] ${elementSelector} {
		--tsb_thumbColor: ${thumbColor};
		--tsb_trackColor: ${trackColor};
	}
	${elementSelector} {
		--tsb_thumbColor: ${thumbColorDark};
		--tsb_trackColor: ${trackColorDark};
	}
}`;

	return `/* thavixt-scrollbar stylesheet for element "${elementSelector}" */
/* variables */
${variables}

${elementSelector} {
	scrollbar-color: var(--tsb_thumbColor) var(--tsb_trackColor);
}`
};

export const DEFAULT_CSS_STYLESHEET = createScrollbarStyles("REPLACEME").replace(
	/="REPLACEME"/g,
	"",
);

export class Scrollbar<T extends HTMLElement = HTMLElement> {
	public stylesheetId = ``;
	public tsbId = ``;
	public wrapperDiv: HTMLDivElement |null = null;
	private scrollTop = 0;
	private scrollLeft = 0;
	private prevScrollDetails: null | Partial<ScrollbarScrollDetails> = null;
	private prevThresholdsReached: null | Partial<ScrollbarThresholdsReached> = null;

	constructor(
		public container: T,
		public options: ScrollbarOptions = {},
	) {
		const rnd = crypto.randomUUID().slice(0, 8);
		this.tsbId = `tsb_scrollbar_${rnd}`;
		this.stylesheetId = `tsb_scrollbar_style_${rnd}`;
		this.init();
	}

	private init = () => {
		this.addStyleSheet();
		this.addEventListeners();
		this.container.style.overflow = "auto";
		this.container.dataset["tsbId"] = this.tsbId;
	};

	destroy = () => {
		this.removeStyleSheet();
		this.removeEventListeners();
		delete this.container.dataset["tsbId"];
	};

	private addStyleSheet = () => {
		const alreadyInjected = !!document.getElementById(this.stylesheetId);
		if (alreadyInjected) {
			this.removeStyleSheet();
		}
		const css = document.createElement("style");
		css.id = this.stylesheetId;
		const applyToAll = this.container === document.body;
		css.appendChild(
			document.createTextNode(
				createScrollbarStyles(
					applyToAll ? null : this.tsbId,
					{
						...DEFAULT_STYLES,
						...this.options.styles,
					})
			)
		);
		document.head.prepend(css);
	};

	private removeStyleSheet = () => {
		const stylesheet = document.getElementById(this.stylesheetId);
		if (!stylesheet) {
			return;
		}
		stylesheet.remove();
	};

	private addEventListeners = () => {
		this.container.addEventListener("scroll", this.onScroll);
		this.container.addEventListener("wheel", this.onWheel);
	};

	private removeEventListeners = () => {
		this.container.removeEventListener("scroll", this.onScroll);
		this.container.removeEventListener("wheel", this.onWheel);
	};

	private onWheel = (e: WheelEvent) => {
		if (e.deltaY < 0) {
			this.container.dataset.scrolldirection = 'up';
		}
		if (e.deltaY > 0) {
			this.container.dataset.scrolldirection = 'down';
		}
	}

	private onScroll = (e: Event) => {
		const target = e.target as T;

		// scroll values
		const top = target.scrollTop;
		const bottom = Math.ceil(target.scrollHeight - target.scrollTop);
		const left = target.scrollLeft;
		const right = Math.ceil(target.scrollWidth - target.scrollLeft);
		const scrollValues = { top, bottom, left, right };
		// scroll threshold reached
		const topReached = !!this.scrollTop && top === 0;
		const bottomReached = bottom === target.clientHeight;
		const leftReached = !!this.scrollLeft && left === 0;
		const rightReached = right === target.clientWidth;
		const thresholdsReached = filterTruthyValues({
			top: topReached,
			bottom: bottomReached,
			left: leftReached,
			right: rightReached,
		});

		this.scrollTop = top;
		this.scrollLeft = left;

		const thresholdsReachedChanged =
			JSON.stringify(thresholdsReached) !==
			JSON.stringify(this.prevThresholdsReached);
		const directions = Object.keys(thresholdsReached) as ScrollDirection[];
		if (thresholdsReachedChanged && directions.length) {
			if (this.prevThresholdsReached && this.options.onScrollToEnd) {
				this.options.onScrollToEnd(directions);
			}
			this.prevThresholdsReached = thresholdsReached;
			this.container.dataset.end = (
				Object.keys(thresholdsReached) as ScrollDirection[]
			).join(",");
		} else {
			delete this.container.dataset.animating;
		}

		const scrollValuesChanged =
			JSON.stringify(scrollValues) !==
			JSON.stringify(this.prevScrollDetails);
		if (scrollValuesChanged) {
			if (this.prevScrollDetails) {
				this.options.onScroll?.(scrollValues);
			}
			this.prevScrollDetails = scrollValues;
		}
	};
}

function filterTruthyValues<T extends Record<string, unknown>>(
	obj: T,
): Partial<T> {
	return Object.keys(obj).reduce((acc, key) => {
		if (obj[key]) {
			return {
				...acc,
				[key]: obj[key],
			};
		}
		return acc;
	}, {} as Partial<T>);
}

export default Scrollbar;
