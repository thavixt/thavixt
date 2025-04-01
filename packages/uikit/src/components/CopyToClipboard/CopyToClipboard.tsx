import { Typography } from "../Typography/Typography";
import "./CopyToClipboard.css";

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
	onClick: (value: string) => void;
}

export function CopyToClipboard({ children, transform, title, onClick: providedOnClick }: CopyToClipboardProps) {
	const transformedText = transform ? transform(children) : children;
	const titleText = title ?? `Copy "${transformedText}" to clipboard`;
	const onClick = () => {
		navigator.clipboard.writeText(transformedText);
		if (providedOnClick) {
			providedOnClick(transformedText);
		} else {
			alert(`"${transformedText}" copied to clipboard.`)
		}
	};

	return (
		<div
			data-testid="CopyToClipboard"
			className="CopyToClipboard"
			onClick={onClick}
			title={titleText}
		>
			<Typography.Text className="normal-case">
				{children}
			</Typography.Text>
		</div>
	)
}
