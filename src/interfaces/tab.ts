export interface ITab {
  tabs: readonly any[];
  currentTab: string;
  setCurrentTab: (name: string) => void;
}

export interface ITabType {
  id: string;
  name: string;
}

export interface ITabItem {
  tab: ITabType;
  currentTab: string;
  setCurrentTab: (name: string) => void;
}
