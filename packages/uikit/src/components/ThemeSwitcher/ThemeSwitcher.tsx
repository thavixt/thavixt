import classNames from "classnames";
import { RefObject, useMemo, useState } from "react";
import "./ThemeSwitcher.css";
import { Button } from "../Button/Button";

type Theme = 'light' | 'dark';
const DEFAULT_THEME = 'dark';

export interface ThemeSwitcherProps {
  className?: string;
  ref?: RefObject<HTMLButtonElement>;
  /** position of the switcher button */
  position: 'inline' | 'left' | 'right' | 'bottomleft' | 'bottomright';
}

export function ThemeSwitcher({ ref, className, position = "inline" }: ThemeSwitcherProps) {
  const [counter, setCounter] = useState(0);

  const htmlElement = useMemo(() => document.documentElement, []);
  const currentTheme = useMemo(
    (): Theme => htmlElement.getAttribute('data-theme') as Theme ?? DEFAULT_THEME,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [counter, htmlElement],
  );

  const switchTheme = () => {
    if (currentTheme === 'light') {
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.setAttribute('data-theme', 'light');
    }
    setCounter(prev => prev + 1);
  }

  const classes = classNames(
    'ThemeSwitcher',
    position === 'left' && 'ThemeSwitcher--left',
    position === 'right' && 'ThemeSwitcher--right',
    position === 'bottomright' && 'ThemeSwitcher--bottomright',
    position === 'bottomleft' && 'ThemeSwitcher--bottomleft',
    className,
  );

  return (
    <Button
      data-testid="ThemeSwitcher"
      ref={ref}
      className={classes}
      onClick={switchTheme}
      icon={{ icon: currentTheme === 'dark' ? 'Light' : 'Dark' }}
      title={currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    />
  )
}
