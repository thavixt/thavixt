import classNames from "classnames";
import { CommonProps } from "../../common/commonProps";
import { Typography } from "../Typography/Typography";
import { Link } from "../Link/Link";

interface QuoteProps extends CommonProps<HTMLQuoteElement> {
  by: string;
  link?: string;
}

export function Quote({ children, className, by, link, ...props }: QuoteProps) {
  const containerClasses = classNames(
    'themedText themedBackground',
    'pt-2 px-4 border-l-12 border-orange-500 rounded-md shadow-lg',
    className,
  );
  const quotationMarkClasses = "font-bold text-xl";
  const quoteClasses = "font-serif italic leading-8 max-w-160 text-center mx-auto";
  const fromClasses = classNames('opacity-60 text-right text-sm');

  return (
    <blockquote className={containerClasses} {...props} cite={link}>
      <Typography type="body" className={quoteClasses}>
        <Typography type="text" className={quotationMarkClasses}>&#x00AB;{' '}</Typography>
        <Typography type="text">{children}</Typography>
        <Typography type="text" className={quotationMarkClasses}>{' '}&#x00BB;</Typography>
      </Typography>
      <Typography type="body" className={fromClasses}>
        <address>
          {link ? (
            <Link href={link}>— {by}</Link>
          ) : (
            <span>— {by}</span>
          )}
        </address>
      </Typography>
    </blockquote>
  )
}