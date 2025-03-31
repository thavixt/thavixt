import classNames from "classnames";
import { useState } from "react";
import { Button } from "../Button/Button";
import { ClickTarget } from "../ClickTarget/ClickTarget";
import { Typography } from "../Typography/Typography";
import { Avatar, AvatarProps } from "../Avatar/Avatar";

export interface NavbarItem {
  key: string;
  label: string;
  tooltip?: string;
  onClick: (key: string) => void;
}

export interface NavbarProps {
  className?: string;
  brandName: string;
  image: string | Pick<AvatarProps, 'src' | 'status'>;
  imageHref?: string,
  navItems?: NavbarItem[];
}

export function NavigationBar({
  className,
  brandName,
  image,
  imageHref,
  navItems = [],
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={classNames(
        'themedBackground themedBorder sticky place-self-center w-full z-1000 top-2 left-0 p-2 shadow-md mb-4 mx-auto max-w-4xl',
        className,
      )}
    >
      <ClickTarget className="mx-auto px-4" onClickOutside={() => setIsOpen(false)}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {imageHref ? (
              <a href={imageHref}>
                {typeof image === "string" ? (
                  <img src={image} className="h-8 w-8" />
                ) : (
                  <Avatar {...image} />
                )}
              </a>
            ) : (
              typeof image === "string" ? (
                <img src={image} className="h-8 w-8" />
              ) : (
                <Avatar {...image} />
              )
            )}
            <Typography.Subtitle className="truncate">{brandName}</Typography.Subtitle>
          </div>

          <div className="relative hidden md:block space-x-2">
            {navItems.map((item) => (
              <Button
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

          <div className="relative block md:hidden">
            <Button
              icon={{ icon: isOpen ? 'Cross' : 'Caret', className: 'rotate-90' }}
              variant="silent"
              onClick={() => setIsOpen(prev => !prev)}
            />
            <div
              className={classNames(
                'themedBackground themedBorder p-1 absolute top-full -mt-1 right-0 w-fit transition-all opacity-0 shadow-xl',
                {
                  '-z-1 collapse': !isOpen,
                  'z-10 opacity-100': isOpen,
                },
              )}
            >
              <div className="flex flex-col items-end px-2 py-1 space-y-1">
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
      </ClickTarget>
    </nav>
  );
};
