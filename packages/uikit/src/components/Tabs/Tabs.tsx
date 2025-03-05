import classNames from "classnames";
import {
  Children,
  PropsWithChildren,
  ReactElement,
  RefObject,
  cloneElement,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { themedBackgroundClasses } from "../../common/theme";
import { Divider } from "../Divider/Divider";

export type TabsHandle = RefObject<HTMLDivElement | null> & {
  nextTab: () => void;
  prevTab: () => void;
}

export interface TabsProps extends PropsWithChildren {
  children?: ReactElement<TabProps>[];
  className?: string;
  defaultTabIndex?: number;
  ref?: RefObject<TabsHandle | null>,
};

export function Tabs({ defaultTabIndex = 0, ref, ...props }: TabsProps) {
  const [activeTab, setActiveTab] = useState<number>(defaultTabIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs = Children.toArray(props.children) as ReactElement<TabProps>[];
  const tabTitles = tabs.filter((child) => child.type === Tab).map(tab => (tab.props as TabProps).title);

  useImperativeHandle<RefObject<HTMLDivElement | null>, TabsHandle>(
    ref,
    () => ({
      current: containerRef?.current,
      nextTab: () => {
        setActiveTab(prev => Math.min(prev + 1, tabs.length - 1));
      },
      prevTab: () => {
        setActiveTab(prev => Math.max(prev - 1, 0));
      },
    }), [tabs.length]);

  const tabsClasses = classNames(
    'p-4 isolate',
    themedBackgroundClasses,
    props.className,
  );

  return (
    <div ref={containerRef} className={tabsClasses} data-testid="Tabs">
      <div className="flex space-x-2">{tabTitles.map((tabTitle, i) => {
        return (
          <div
            key={`tab-${i}`}
            data-testid={`Tab-${i}`}
            className={classNames('cursor-pointer truncate px-2 transition-colors rounded-md', {
              'bg-slate-300 dark:bg-slate-600': i === activeTab,
              'opacity-50': i !== activeTab,
            })}
            onClick={() => setActiveTab(i)}
            title={tabTitle}
          >
            {tabTitle}
          </div>
        )
      })}
      </div>
      <Divider />
      <div className="flex flex-col pt-2 relative">
        {tabs.map((c, i) => {
          return cloneElement(c, { active: i === activeTab, key: `tab-${i}` })
        })}
      </div>
    </div>
  );
}

// Slot components

export interface TabProps {
  title: string;
  active?: boolean;
  // children?: ReactElement[] | ((
  //   next: () => void,
  //   prev: () => void,
  //   hasNext: boolean,
  //   hasPrev: boolean,
  // ) => ReactElement[]);
}
function Tab({ children, active }: PropsWithChildren<TabProps>) {
  const classes = classNames(
    'transition-all duration-200',
    {
      'z-0 opacity-0 absolute w-full h-full h-0 -ml-1 pointer-events-none': !active,
      'z-1 opacity-100 h-full ml-0': active,
    }
  )
  return (
    <div className={classes}>
      {children}
    </div>
  )
};

Tabs.Tab = Tab;
