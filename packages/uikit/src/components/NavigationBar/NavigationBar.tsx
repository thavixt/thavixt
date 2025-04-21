import classNames from "classnames";
import { useState } from "react";
import { Button } from "../Button/Button";
import { ClickTarget } from "../ClickTarget/ClickTarget";
import { Typography } from "../Typography/Typography";
import { Avatar, AvatarProps } from "../Avatar/Avatar";
import "./NavigationBar.css";

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
  imageTooltip?: string;
  navItems?: NavbarItem[];
}

export function NavigationBar({
  className,
  brandName,
  image,
  imageHref,
  imageTooltip,
  navItems = [],
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={classNames("NavigationBar", className)}
    >
      <div className="NavigationBar__container-wrapper">
        <div className="NavigationBar__container">
          {imageHref ? (
            <a href={imageHref} data-testid="NavigationBarBrandLink">
              {typeof image === "string" ? (
                <img title={imageTooltip} src={image} className="NavigationBar__img" />
              ) : (
                <Avatar title={imageTooltip} {...image} />
              )}
            </a>
          ) : (
            typeof image === "string" ? (
              <img title={imageTooltip} src={image} className="NavigationBar__img" />
            ) : (
              <Avatar title={imageTooltip} {...image} />
            )
          )}
          <Typography type="subtitle" className="NavigationBar__brand">
            {brandName}
          </Typography>
        </div>

        <div className="NavigationBar--itemsContainer">
          {navItems.map((item) => (
            <Button
              data-testid="NavigationBarItem"
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

        <div className="NavigationBar--navWrapper">
          <ClickTarget className="NavigationBar__clickTarget" onClickOutside={() => setIsOpen(false)}>
            <Button
              data-testid="NavigationBarNavButton"
              icon={{ type: isOpen ? 'Cross' : 'Caret', className: 'NavigationBar--navButton' }}
              variant="silent"
              onClick={() => setIsOpen(prev => !prev)}
            />
          </ClickTarget>
          <div
            className={classNames(
              'NavigationBar--navContainer',
              isOpen && 'NavigationBar--navContainer-open',
            )}
          >
            <div className="NavigationBar--navItem">
              {navItems.map((item) => (
                <Button
                  data-testid="NavigationBarListItem"
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
    </nav>
  );
};
