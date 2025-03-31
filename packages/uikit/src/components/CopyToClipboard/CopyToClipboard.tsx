import { Typography } from "../Typography/Typography";
import classNames from "classnames";

interface CopyToClipboardProps {
	/**
	 * text to display and copy
	 */
	children: string;
	title?: string;
	/**
	 * Transform the content before copying
	 */
	transform?: (value: string) => string;
}

export function CopyToClipboard({ children, transform, title }: CopyToClipboardProps) {
	const transformedText = transform ? transform(children) : children;
	const titleText = title ?? `Copy ${transformedText} to clipboard`;
	const onClick = () => {
		navigator.clipboard.writeText(transformedText);
		alert(`"${transformedText}" copied to clipboard.`)
	};

	return (
		<div
			className={classNames(
				"themedBorder",
				"inline px-2 py-1 cursor-pointer",
				"bg-slate-100 hover:bg-slate-200",
				"dark:bg-slate-600 dark:hover:bg-slate-700",
				"border-2",
			)}
			onClick={onClick}
			title={titleText}
		>
			<Typography.Text className="normal-case">
				{children}
			</Typography.Text>
		</div>
	)
}
