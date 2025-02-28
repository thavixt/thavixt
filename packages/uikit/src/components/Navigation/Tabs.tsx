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
import { Divider } from "../DataDisplay/Divider";
import { themedBackgroundClasses } from "../../common/theme";

export type TabsHandle = {
  container: HTMLDivElement | null;
  nextTab: () => void
  prevTab: () => void
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

  useImperativeHandle(
    ref,
    () => ({
      container: containerRef?.current,
      nextTab: () => setActiveTab(prev => Math.min(prev + 1, tabs.length - 1)),
      prevTab: () => setActiveTab(prev => Math.max(prev - 1, 0)),
    }), [tabs.length]);

  const tabsClasses = classNames(
    themedBackgroundClasses,
    'p-4',
    props.className,
  );

  return (
    <div ref={containerRef} className={tabsClasses}>
      <div className="flex space-x-8">{tabTitles.map((tabTitle, i) => {
        return (
          <div
            key={`tab-${i}`}
            className={classNames('cursor-pointer truncate', { 'underline underline-offset-4': i === activeTab })}
            onClick={() => setActiveTab(i)}
            title={tabTitle}
          >
            &nbsp;{tabTitle}&nbsp;
          </div>
        )
      })}
      </div>
      <Divider />
      <div className="flex flex-col pt-2">
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
}
function Tab({ children, active }: PropsWithChildren<TabProps>) {
  return (
    <div className={classNames({
      'hidden': !active,
    })}>
      {children}
    </div>
  )
};

Tabs.Tab = Tab;
