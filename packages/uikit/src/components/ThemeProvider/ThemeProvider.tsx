import { PropsWithChildren } from "react";

interface ThemeProviderProps {
  colors?: Record<string, string>
}

export function ThemeProvider({ children, colors = {} }: PropsWithChildren<ThemeProviderProps>) {
  const id = `theme-${crypto.randomUUID().slice(0, 8)}`;
  const styles = `.${id} {\n\t${Object.entries(colors).map(([key, value]) => `--color-${key}: ${value};`).join('\n\t')}\n}`;
  return (
    <div className={id}>
      <style scoped>{styles}</style>
      {children}
    </div>
  );
}
