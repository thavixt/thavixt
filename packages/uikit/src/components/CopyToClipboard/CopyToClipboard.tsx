import { Typography } from "../Typography/Typography";
import { themedBorderClasses, themedTextClasses } from "../../common/theme";
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

	const classes = classNames(
		"inline px-2 py-1 cursor-pointer",
		"bg-slate-100 hover:bg-slate-200",
		"dark:bg-slate-600 dark:hover:bg-slate-700",
		themedTextClasses,
		"border-2",
		themedBorderClasses,
	);

	return (
		<div className={classes} onClick={onClick} title={titleText}>
			<Typography.Text className="normal-case">
				{children}
			</Typography.Text>
		</div>
	)
}
