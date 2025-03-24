import { PropsWithChildren } from "react";

type Color = "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" |
  "indigo" | "violet" | "purple" | "fuschia" | "pink" | "rose" | "slate" | "gray" | "zinc" | "neutral" | "stone";
type Number = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
type TailwindColor = `${Color}-${Number}`;

interface ThemeOverrideProps {
  colors?: Partial<Record<TailwindColor | 'black' | 'white', string>>;
}

export function ThemeOverride({ children, colors = {} }: PropsWithChildren<ThemeOverrideProps>) {
  const id = `theme-${crypto.randomUUID().slice(0, 8)}`;
  const styles = `.${id} {\n\t${Object.entries(colors).map(([k, v]) => `--color-${k}: ${v};`).join('\n\t')}\n}`;
  return (
    <div className={id}>
      <style scoped>{styles}</style>
      {children}
    </div>
  );
}
