import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { Typography } from "../Typography/Typography";
import { Link } from "../Link/Link";
import { Box, BoxProps } from "../Box/Box";
import "./Quote.css";

export interface QuoteProps extends CommonProps<HTMLQuoteElement> {
  by: string;
  link?: string;
  size?: BoxProps['size'];
}

export function Quote({ children, className, by, link, size = 'md', ...props }: QuoteProps) {
  return (
    <Box type="card" size={size} className={classNames('Quote', className)}>
      <Box.Content>
        <blockquote {...props} cite={link}>
          <div className="Quote__text">
            <Typography type="text" className="Quote__mark">"</Typography>
            <Typography type="text">{children}</Typography>
            <Typography type="text" className="Quote__mark">"</Typography>
          </div>
        </blockquote>
      </Box.Content>
      <Box.Footer className="Quote__from">
        {link
          ? <Link href={link}>{'— '} {by}</Link>
          : <Typography type="text">{'— '} {by}</Typography>
        }
      </Box.Footer>
    </Box>
  )
}