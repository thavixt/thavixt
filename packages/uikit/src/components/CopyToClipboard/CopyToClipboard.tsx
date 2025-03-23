import { useCallback } from "react";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";

interface CopyToClipboardProps {
	children: string;
	title?: string;
	transform?: (value: string) => string;
}

export function CopyToClipboard({ children, transform, title = "Copy to clipboard" }: CopyToClipboardProps) {
	const onClick = useCallback(() => {
		const transformedText = transform ? transform(children) : children;
		navigator.clipboard.writeText(transformedText);
		alert(`"${transformedText}" copied to clipboard.`)
	}, [children, transform])

	return (
		<Button variant="silent" onClick={onClick} title={title}>
			<Typography.Code className="normal-case">
				{children}
			</Typography.Code>
		</Button>
	)
}
