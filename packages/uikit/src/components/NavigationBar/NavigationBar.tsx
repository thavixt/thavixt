import classNames from "classnames";
import { useState } from "react";
import { Button } from "../Button/Button";
import { themedBackgroundClasses } from "../../common/theme";
import { ClickTarget } from "../ClickTarget/ClickTarget";
import { Typography } from "../Typography/Typography";

interface NavbarItem {
  key: string;
  label: string;
  tooltip?: string;
  onClick: (key: string) => void;
}

export interface NavbarProps {
  className?: string;
  brandName: string;
  logo: string;
  logoURL?: string,
  navItems?: NavbarItem[];
}

export function NavigationBar({
  className,
  brandName,
  logo,
  logoURL,
  navItems = [],
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={classNames(
        'sticky place-self-center w-full z-1000 top-1 left-0 p-2 shadow-md mb-4',
        themedBackgroundClasses,
        className,
      )}
    >
      <ClickTarget onClickOutside={() => setIsOpen(false)}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center h-fit">
            <div className="flex items-center">
              {logoURL ? (
                <a href={logoURL}>
                  <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
                </a>
              ) : (
                <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
              )}
              <Typography.Subtitle>{brandName}</Typography.Subtitle>
            </div>
            <div className="relative">
              <Button
                icon={{ icon: isOpen ? 'Cross' : 'Caret', className: 'rotate-90' }}
                variant="silent"
                onClick={() => setIsOpen(prev => !prev)}
              />
              <div
                className={classNames(
                  'absolute top-full -mt-1 right-0 w-fit',
                  'transition-all opacity-0',
                  {
                    '-z-1 collapse': !isOpen,
                    'z-10 opacity-100': isOpen,
                  },
                  themedBackgroundClasses,
                )}
              >
                <div className="px-2 py-1 space-y-1 flex flex-col items-end shadow-xl">
                  {navItems.map((item) => (
                    <Button
                      className="whitespace-nowrap"
                      key={item.key}
                      variant="silent"
                      onClick={() => {
                        item.onClick(item.key);
                        setIsOpen(false);
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClickTarget>
    </nav>
  );
};
