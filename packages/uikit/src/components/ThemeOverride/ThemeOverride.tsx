import { PropsWithChildren } from "react";

type ThemeColor =
  'white' |
  'black' |
  'gray' |
  'gray-dark' |
  'slate' |
  'slate-dark' |

  'lime' |
  'green' |
  'emerald' |
  'teal' |

  'sky' |
  'blue' |
  'indigo' |
  'violet' |

  'yellow' |
  'orange' |
  'red' |
  'pink'
;

interface ThemeOverrideProps {
  colors?: Partial<Record<ThemeColor, string>>;
}

export function ThemeOverride({ children, colors = {} }: PropsWithChildren<ThemeOverrideProps>) {
  const id = `theme-${crypto.randomUUID().slice(0, 8)}`;
  const styles = `.${id} {\n\t${Object.entries(colors).map(([k, v]) => `--${k}: ${v};`).join('\n\t')}\n}`;
  return (
    <div className={id}>
      <style scoped>{styles}</style>
      {children}
    </div>
  );
}
