import classnames from "classnames";
import { Typography } from "../Typography/Typography";
import './Avatar.css';

export interface AvatarProps {
  src: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
  onClick?: (name?: string) => void;
}

export function Avatar({ src, name, size = 'md', status, onClick }: AvatarProps) {
  return (
    <div className={classnames('Avatar', { "Avatar--clickable": !!onClick })}>
      <div className="Avatar__content">
        <img
          src={src}
          alt={name}
          onClick={() => onClick?.(name)}
          className={classnames(
            "Avatar__image",
            {
              "Avatar__image--sm w-8 h-8": size === 'sm',
              "Avatar__image--md w-12 h-12": size === 'md',
              "Avatar__image--lg w-16 h-16": size === 'lg',
              "Avatar__image--xl w-20 h-20": size === 'xl',
            }
          )}
        />
        {status && (
          <span
            className={classnames(
              "Avatar__status",
              {
                "Avatar__status--online": status === "online",
                "Avatar__status--offline": status === "offline",
                "Avatar__status--busy": status === "busy",
                "Avatar__status--away": status === "away",
              }
            )}
          />
        )}
      </div>
      <Typography.Label>{name}</Typography.Label>
    </div>
  );
};