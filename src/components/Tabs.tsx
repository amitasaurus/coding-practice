import clsx from 'clsx';
import React, { useContext, createContext, useState } from 'react';

interface ITabProps {
  className?: string;
  children: React.ReactNode;
  value: string;
}

interface ITabRootProps extends Omit<ITabProps, 'value'> {
  defaultValue: string;
}

interface ITabList extends Omit<ITabProps, 'value'> {}

interface TabsContextType {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
const defaultTabProps = {
  activeTab: '',
  setActiveTab: () => {},
};
const TabsContext = createContext<TabsContextType>(defaultTabProps);

export function Tabs({ defaultValue, className, children }: ITabRootProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={clsx(className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: ITabList) {
  return (
    <div className={clsx('flex border border-slate-200', className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className, children }: ITabProps) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={clsx(
        'w-full font-semibold text-slate-800 cursor-pointer p-2 hover:bg-slate-200 bg-slate-100 hover:border-none focus:outline-none border-none rounded-none',
        className,
        {
          'bg-slate-200': activeTab === value,
        }
      )}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children }: ITabProps) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div className={clsx('p-2 py-4 h-full', className)}>{children}</div>;
}

/**
 <div className="flex items-center justify-center w-screen h-screen bg-slate-100">
    <div className="border border-dashed border-slate-300 w-[500px] h-[500px]">
      <Tabs defaultValue="html">
        <TabsList>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
        </TabsList>
        <TabsContent value="html">This is HTML Tab Content</TabsContent>
        <TabsContent value="css">This is CSS Tab Content</TabsContent>
        <TabsContent value="js">This is JS Tab Content</TabsContent>
      </Tabs>
    </div>
  </div>
 */
