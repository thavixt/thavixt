import classnames from "classnames";
import { Typography } from "../Typography/Typography";

export interface AvatarProps {
  src: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
  onClick?: (name?: string) => void;
}

export function Avatar({ src, name, size = 'sm', status, onClick }: AvatarProps) {
  return (
    <div className={classnames(
      'inline-flex flex-col p-1 items-center group',
      {
        "cursor-pointer": !!onClick,
      },
    )}>
      <div className="relative inline-block drop-shadow-lg group-hover:drop-shadow-none">
        <img
          src={src}
          alt={name}
          onClick={() => onClick?.(name)}
          className={classnames(
            "rounded-full object-cover border-2 border-gray-400 dark:border-gray-300",
            {
              "w-8 h-8 text-xs": size === 'sm',
              "w-12 h-12 text-sm": size === 'md',
              "w-16 h-16 text-md": size === 'lg',
              "w-20 h-20 text-lg": size === 'xl',
            }
          )}
        />
        {status && (
          <span
            className={classnames(
              "absolute bottom-0 inset-x-2/3 size-4 rounded-full border-2 border-white",
              {
                "bg-green-500": status === "online",
                "bg-gray-400": status === "offline",
                "bg-red-500": status === "busy",
                "bg-yellow-500": status === "away",
              }
            )}
          />
        )}
      </div>
      <Typography.Label>{name}</Typography.Label>
    </div>
  );
};