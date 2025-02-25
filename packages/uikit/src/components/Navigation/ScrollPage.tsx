import { Button } from "../Basic/Button";

interface ScrollPageProps {
  to: 'top' | 'bottom';
}

export function ScrollPage(props: ScrollPageProps) {
  const onClick = () => {
    // @todo scroll to top/bottom of page
  }

  return (
    <Button variant="default" className="fixed bottom-4 right-4" onClick={onClick}>
      {props.to === 'bottom' ? 'bottom' : 'top'}
    </Button>
  )
}