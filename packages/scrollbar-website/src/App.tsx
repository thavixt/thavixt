// import classNames from "classnames";
import { useCallback, useState } from "react";
// import ColorPicker from 'react-best-gradient-color-picker'
// import OutsideClickHandler from 'react-outside-click-handler';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import darkTheme from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark';
import lightTheme from 'react-syntax-highlighter/dist/esm/styles/prism/material-light';
import { DEFAULT_CSS_STYLESHEET, DEFAULT_STYLES, useScrollbar, ScrollbarStyles, ScrollDirection } from "@thavixt/scrollbar-react";
import {
	sytaxHighlighterStyle,
	demoStyles,
	getText,
	globalCode,
	numericScrollbarStyles,
	styleDescriptions,
	importUnpkgCoreCode,
	getCodeReactHook,
} from "./constants";
import { CopyContentToClipboardButton } from "./components/CopyContentToClipboardButton";
import { NPMBadge } from "./components/NPMBadge";
import { useColorScheme } from "./useColorScheme";

SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('tsx', tsx);

function App() {
	const { colorScheme, toggleColorScheme } = useColorScheme();
	const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

	const [placeholderCount, setPlaceholderCount] = useState(50);
	const [body, setBody] = useState(false);
	const [styles, setStyles] = useState<ScrollbarStyles>(demoStyles);

	const setDemoStyles = useCallback((styles: ScrollbarStyles) => {
		setStyles(styles);
	}, []);

	const onScrollToEnd = useCallback((directions: ScrollDirection[]) => {
		console.log(`[@thavixt/scrollbar-demo] reached ${directions.join(',')}`);
	}, []);

	const ref = useScrollbar<HTMLDivElement>({ body, onScrollToEnd, styles });

	return (
		<div className="mx-auto w-full min-w-lg max-w-2xl lg:max-w-7xl lg:grid lg:grid-cols-2 space-x-8 space-y-16 pt-8 pb-16 px-8">
			<div className="col-span-2">
				<h1>@thavixt/scrollbar</h1>
			</div>

			<div className="flex flex-col gap-4 highlight col-span-2">
				<p>Customize scrollbars on your websites!</p>

				<div className="flex flex-col gap-2">
					<span><b>react</b> package</span>
					<NPMBadge packageName="@thavixt/scrollbar-react" />
					<div className="flex gap-2">
						<code>$ npm i @thavixt/scrollbar-react</code>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<span><b>core</b> package - <em>for use without a framework</em></span>
					<NPMBadge packageName="@thavixt/scrollbar-core" />
					<div className="flex gap-2">
						<code>$ npm i @thavixt/scrollbar-core</code>
					</div>
					<div>
						or import in your <code>.js</code> file from
						{' '}<a target="_blank" href="https://unpkg.com/@thavixt/scrollbar-core/dist/index.js">unpkg</a>:
					</div>
					<SyntaxHighlighter
						language="js"
						style={theme}
						customStyle={sytaxHighlighterStyle}
					>
						{importUnpkgCoreCode}
					</SyntaxHighlighter>
				</div>

				<div className="text-sm flex flex-col">
					<p>Notes:</p>
					<ul>
						<li>
							<p className="inline">
								all packages include <code>.d.ts</code> files for seamless usage with TypeScript
							</p>
						</li>
						<li>
							<p className="inline">
								Check browser complatibility on <a href="https://caniuse.com/css-scrollbar">caniuse.com</a>
							</p>
						</li>
					</ul>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2>Features:</h2>
				<ul className="space-y-2">
					<li>
						<p className="inline">Callbacks:</p>
						<div className="flex flex-col gap-2 pl-4 pt-2">
							<div className="flex flex-col items-start">
								<code>
									{"onScroll: (details) => void"}
								</code>
								<em>Called when the container is scrolled in any direction</em>
							</div>
							<div>
								<div className="flex flex-col items-start">
									<code>
										{"onScrollToEnd: (thresholds) => void"}
									</code>
								</div>
								<em>Called when the container is scrolled to any side boundary</em>
							</div>
						</div>
					</li>

					<li>
						Style customization: (change the values to play with the demo)
						<div className="w-full flex flex-col space-y-2 overflow-x-auto">
							<div className="w-full flex justify-center items-center gap-2 pt-2">
								<span>quick apply:</span>
								<button type="button" onClick={() => setDemoStyles(DEFAULT_STYLES)}>library defaults</button>
								<button type="button" onClick={() => setDemoStyles(demoStyles)}>demo colors</button>
								{/* <button type="button" onClick={() => setDemoStyles(demoGradientStyles)}>gradients example</button> */}
							</div>
							<div className="flex items-center justify-center">
								<button onClick={toggleColorScheme}>
									change page color scheme to <b>{colorScheme === 'dark' ? 'light' : 'dark'}</b>
								</button>
							</div>
							<div className="pl-6">
								<table className="table-auto w-full">
									<thead>
										<tr>
											<th>key</th>
											<th>current value <em>(click to copy)</em></th>
											<th>set value</th>
										</tr>
									</thead>
									<tbody>
										{Object.keys(styles).map((k) => {
											const key = k as keyof ScrollbarStyles;
											return (
												<tr key={key} title={styleDescriptions[key]}>
													<td>
														<label htmlFor={key}>
															<code>{key}</code>
														</label>
													</td>
													<td>
														<CopyContentToClipboardButton transform={(value) => `${key}: "${value}"`}>
															<code>{styles[key]}</code>
														</CopyContentToClipboardButton>
													</td>
													<td>
														{numericScrollbarStyles.includes(key) ? (
															<input
																type="number"
																min="0"
																max="100"
																id={key}
																name={key}
																value={styles[key]}
																onChange={(e) => setStyles((prev) => ({
																	...prev,
																	[key]: e.target.value,
																}))}
															/>
														) : (
															<CustomColorPicker
																name={key}
																value={styles[key] as string}
																onChange={(color) => setStyles((prev) => ({
																	...prev,
																	[key]: color,
																}))}
															/>
														)}
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</li>
				</ul>
			</div>

			<div className="flex flex-col gap-2 justify-center">
				<b>Demo: (change the styles in the table)</b>
				<details>
					<summary>React code example:</summary>
					<SyntaxHighlighter
						language="tsx"
						style={theme}
						customStyle={sytaxHighlighterStyle}
					>
						{getCodeReactHook(styles, placeholderCount)}
					</SyntaxHighlighter>
				</details>
				<div
					ref={ref}
					className="h-[300px] w-full overflow-auto whitespace-pre"
				>
					{getText(placeholderCount)}
				</div>

				<p>Check the dev console <code>F12</code> to see logs.</p>

				<div className="flex flex-col gap-2 items-center justify-center">
					<div className="flex gap-2">
						<label htmlFor="count">
							# of placeholder lines:
						</label>
						<input
							className="bg-slate-600 rounded-sm text-slate-100 text-center w-20"
							type="number"
							id="count"
							min={1}
							onChange={(e) => setPlaceholderCount(+e.target.value)}
							value={placeholderCount}
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-2 highlight">
				<b>Apply styles globally</b>
				<div className="flex gap-2 items-center justify-start">
					<input
						type="checkbox"
						name="body"
						id="body"
						onChange={e => setBody(e.target.checked)}
						defaultChecked={body}
					/>
					<label htmlFor="body">customize every scrollbar on the page:</label>
				</div>
				<details>
					<summary>React code example:</summary>
					<SyntaxHighlighter
						language="tsx"
						style={theme}
						customStyle={sytaxHighlighterStyle}
					>
						{globalCode}
					</SyntaxHighlighter>
				</details>
			</div>

			<div className="flex flex-col gap-2">
				<p>Default styles:</p>
				<SyntaxHighlighter
					language="css"
					style={theme}
					customStyle={sytaxHighlighterStyle}
				>
					{DEFAULT_CSS_STYLESHEET}
				</SyntaxHighlighter>
			</div>

		</div>
	);
}

interface ColorPickerProps {
	name: string;
	value: string;
	onChange: (color: string) => void;
}

function CustomColorPicker({ name, value, onChange }: ColorPickerProps) {
	// const [visible, setVisible] = useState(false);

	return (
		// <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
		// <div className="group cursor-pointer" onClick={() => setVisible(true)}>
			<div className="group cursor-pointer">
				<input
					id={name}
					name={name}
					onChange={(e) => onChange(e.target.value)}
					type="color"
					value={value}
				/>
				{/* <div className="h-12 w-24 block border-2 border-slate-600" style={{ background: value }} /> */}
				{/* <ColorPicker
					className={classNames(
						"z-10 absolute shadow-2xl shadow-slate-700 outline-slate-600 outline-4 rounded-xl -translate-y-1/2 -translate-x-1/2",
						{
							"block": visible,
							"hidden": !visible,
						},
					)}
					hidePresets
					onChange={onChange}
					showHexAlpha
					value={value}
				/> */}
			</div>
		// </OutsideClickHandler>
	)
}

export default App;
